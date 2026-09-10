import os
import math
import subprocess
import numpy as np
from PIL import Image, ImageFilter
import imageio_ffmpeg

SOAPS = [
    {
        "name": "Coral Soap",
        "file": "public/images/beach-stills/01-coral.png",
        "halo": (230, 160, 150),
    },
    {
        "name": "Cloud Soap",
        "file": "public/images/beach-stills/02-cloud.png",
        "halo": (140, 190, 230),
    },
    {
        "name": "Beach Soap",
        "file": "public/images/beach-stills/03-beach.png",
        "halo": (90, 175, 195),
    },
    {
        "name": "Sea Voyage Soap",
        "file": "public/images/beach-stills/04-sea-voyage.png",
        "halo": (65, 110, 180),
    },
]

WIDTH = 1920
HEIGHT = 1080
FPS = 30
SECONDS_PER_SOAP = 3.6
TRANSITION_SECONDS = 0.8
TOTAL_SOAPS = len(SOAPS)

# Pre-generate 1920x1080 master still for each soap
def build_master_frame(img_path, halo_rgb):
    src = Image.open(img_path).convert("RGB")
    # Scale src so soap fits comfortably in 1080p height (e.g., 960px high)
    target_soap_h = 960
    scale = target_soap_h / src.height
    soap_w = int(src.width * scale)
    scaled_soap = src.resize((soap_w, target_soap_h), Image.Resampling.LANCZOS)

    # Master canvas filled with warm cream linen base
    # sample edges from src
    src_arr = np.array(src)
    top_edge = src_arr[:20, :, :].mean(axis=(0,1)).astype(int)
    bot_edge = src_arr[-20:, :, :].mean(axis=(0,1)).astype(int)
    left_edge = src_arr[:, :20, :].mean(axis=(0,1)).astype(int)
    right_edge = src_arr[:, -20:, :].mean(axis=(0,1)).astype(int)

    base_bg = Image.new("RGB", (WIDTH, HEIGHT), tuple(top_edge))
    
    # Extended background using blurred source
    bg_wide = src.resize((WIDTH, HEIGHT), Image.Resampling.BILINEAR)
    bg_wide = bg_wide.filter(ImageFilter.GaussianBlur(radius=50))
    
    # Soft ambient halo behind product
    halo = Image.new("RGBA", (WIDTH, HEIGHT), (0,0,0,0))
    halo_arr = np.zeros((HEIGHT, WIDTH, 4), dtype=np.uint8)
    cx, cy = WIDTH // 2, HEIGHT // 2
    y_coords, x_coords = np.ogrid[:HEIGHT, :WIDTH]
    dist = np.sqrt(((x_coords - cx) / 1.5) ** 2 + (y_coords - cy) ** 2)
    max_r = 500
    halo_alpha = np.clip((1 - dist / max_r) * 90, 0, 90).astype(np.uint8)
    halo_arr[:, :, 0] = halo_rgb[0]
    halo_arr[:, :, 1] = halo_rgb[1]
    halo_arr[:, :, 2] = halo_rgb[2]
    halo_arr[:, :, 3] = halo_alpha
    halo = Image.fromarray(halo_arr, "RGBA")

    # Combine bg and halo
    combined_bg = bg_wide.copy().convert("RGBA")
    combined_bg.alpha_composite(halo)
    master = combined_bg.convert("RGB")

    # Paste soap in center with feathered horizontal edge
    soap_x = (WIDTH - soap_w) // 2
    soap_y = (HEIGHT - target_soap_h) // 2

    mask = Image.new("L", (soap_w, target_soap_h), 255)
    mask_arr = np.array(mask)
    feather = 45
    for i in range(feather):
        alpha = int(255 * (i / feather))
        mask_arr[:, i] = np.minimum(mask_arr[:, i], alpha)
        mask_arr[:, soap_w - 1 - i] = np.minimum(mask_arr[:, soap_w - 1 - i], alpha)
        mask_arr[i, :] = np.minimum(mask_arr[i, :], alpha)
        mask_arr[target_soap_h - 1 - i, :] = np.minimum(mask_arr[target_soap_h - 1 - i, :], alpha)
    feather_mask = Image.fromarray(mask_arr)

    master.paste(scaled_soap, (soap_x, soap_y), feather_mask)
    return master

def main():
    print("Building master soap frames...")
    masters = []
    for idx, soap in enumerate(SOAPS):
        print(f"Processing {soap['name']}...")
        master = build_master_frame(soap["file"], soap["halo"])
        masters.append(master)

    frames_per_soap = int(SECONDS_PER_SOAP * FPS)
    trans_frames = int(TRANSITION_SECONDS * FPS)
    total_frames = frames_per_soap * TOTAL_SOAPS
    total_duration = total_frames / FPS

    print(f"Generating {total_frames} frames ({total_duration:.1f}s at {FPS}fps)...")

    # Setup FFmpeg process for video encoding
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    out_video_temp = "public/videos/soap-temp-video.mp4"
    out_final = "public/videos/beach-collection.mp4"
    out_soap = "public/videos/SOAP.mp4"

    cmd = [
        ffmpeg_exe, "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{WIDTH}x{HEIGHT}",
        "-pix_fmt", "rgb24",
        "-r", str(FPS),
        "-i", "-",
        "-an",
        "-vcodec", "libx264",
        "-pix_fmt", "yuv420p",
        "-preset", "medium",
        "-crf", "18",
        out_video_temp
    ]

    pipe = subprocess.Popen(cmd, stdin=subprocess.PIPE)

    for i in range(total_frames):
        soap_idx = (i // frames_per_soap) % TOTAL_SOAPS
        next_soap_idx = (soap_idx + 1) % TOTAL_SOAPS
        pos_in_soap = i % frames_per_soap

        # Compute Ken Burns zoom: alternate zoom-in and zoom-out
        progress = pos_in_soap / frames_per_soap
        if soap_idx % 2 == 0:
            scale = 1.0 + 0.05 * progress
        else:
            scale = 1.05 - 0.05 * progress

        # Render current frame
        base_img = masters[soap_idx]
        cur_w = int(WIDTH * scale)
        cur_h = int(HEIGHT * scale)
        scaled_img = base_img.resize((cur_w, cur_h), Image.Resampling.BILINEAR)
        crop_x = (cur_w - WIDTH) // 2
        crop_y = (cur_h - HEIGHT) // 2
        frame_img = scaled_img.crop((crop_x, crop_y, crop_x + WIDTH, crop_y + HEIGHT))

        # Check if in transition window
        if pos_in_soap >= (frames_per_soap - trans_frames):
            trans_p = (pos_in_soap - (frames_per_soap - trans_frames)) / trans_frames
            # Smooth Hermite / S-curve interpolation
            blend = trans_p * trans_p * (3 - 2 * trans_p)

            # Next soap frame
            if next_soap_idx % 2 == 0:
                next_scale = 1.0 + 0.05 * (trans_p * (trans_frames / frames_per_soap))
            else:
                next_scale = 1.05 - 0.05 * (trans_p * (trans_frames / frames_per_soap))
            
            next_img = masters[next_soap_idx]
            n_w = int(WIDTH * next_scale)
            n_h = int(HEIGHT * next_scale)
            next_scaled = next_img.resize((n_w, n_h), Image.Resampling.BILINEAR)
            n_crop_x = (n_w - WIDTH) // 2
            n_crop_y = (n_h - HEIGHT) // 2
            next_frame = next_scaled.crop((n_crop_x, n_crop_y, n_crop_x + WIDTH, n_crop_y + HEIGHT))

            frame_img = Image.blend(frame_img, next_frame, blend)

        pipe.stdin.write(frame_img.tobytes())

        if i % 60 == 0:
            print(f"Rendered frame {i}/{total_frames} ({(i/total_frames)*100:.1f}%)")

    pipe.stdin.close()
    pipe.wait()
    print("Raw video generated.")

    # Generate relaxing coastal ambient soundscape with subtle ocean waves and warm tone
    print("Synthesizing ambient coastal soundscape...")
    audio_filter = (
        f"anoisesrc=color=brown:amplitude=0.14:r=44100,"
        f"lowpass=f=950,volume=1.2,"
        f"tremolo=f=0.22:d=0.75"
    )

    # Combine video + generated soothing audio into final production MP4
    mux_cmd = [
        ffmpeg_exe, "-y",
        "-i", out_video_temp,
        "-f", "lavfi",
        "-i", audio_filter,
        "-t", f"{total_duration:.2f}",
        "-c:v", "copy",
        "-c:a", "aac",
        "-b:a", "192k",
        "-shortest",
        out_final
    ]
    subprocess.run(mux_cmd, check=True)
    print(f"Saved: {out_final}")

    # Copy to SOAP.mp4 as well so existing references use the new 4-soap premium video
    import shutil
    shutil.copyfile(out_final, out_soap)
    print(f"Updated: {out_soap}")

    if os.path.exists(out_video_temp):
        os.remove(out_video_temp)

    print("Video generation successfully completed!")

if __name__ == "__main__":
    main()
