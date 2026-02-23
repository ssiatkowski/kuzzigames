import os
from PIL import Image

def apply_threshold_cleanup(img, threshold=248):
    """
    Applies the logic from clean_background.py: 
    Pixels brighter than the threshold (in all RGB channels) become pure white.
    """
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    datas = img.getdata()
    new_data = []
    
    for item in datas:
        # Check if it is ALREADY pure white
        if item == (255, 255, 255):
            new_data.append(item)
            continue

        # Check if it is "noisy white" (above threshold)
        if item[0] > threshold and item[1] > threshold and item[2] > threshold:
            new_data.append((255, 255, 255))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    return img

def batch_convert_and_delete(source_folder):
    """
    Converts PNGs to 128x128 JPGs, applies whiteness thresholding,
    and deletes original PNGs.
    """
    files = [f for f in os.listdir(source_folder) if f.lower().endswith('.png')]
    
    if not files:
        print(f"No PNG files found in {source_folder}")
        return

    print(f"Found {len(files)} PNG files. Converting, cleaning (Threshold 248), and cleaning up...")

    for filename in files:
        png_path = os.path.join(source_folder, filename)
        jpg_filename = os.path.splitext(filename)[0] + ".jpg"
        jpg_path = os.path.join(source_folder, jpg_filename)
        
        conversion_successful = False
        
        try:
            with Image.open(png_path) as img:
                # 1. Resize to 128x128
                img = img.resize((128, 128), Image.Resampling.LANCZOS)
                
                # 2. Handle Transparency (Composite over white background)
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    background = Image.new("RGB", img.size, (255, 255, 255))
                    img = img.convert("RGBA")
                    background.paste(img, mask=img.split()[3])
                    final_img = background
                else:
                    final_img = img.convert("RGB")
                
                # 3. APPLY CLEANUP STEP (Threshold 248)
                final_img = apply_threshold_cleanup(final_img, threshold=248)
                
                # 4. Save as JPG with max quality to prevent re-introducing noise
                final_img.save(jpg_path, "JPEG", quality=100, subsampling=0)
                conversion_successful = True
                print(f"Created & Cleaned: {jpg_filename}")
                
        except Exception as e:
            print(f"FAILED to convert {filename}: {e}")

        # Delete the original PNG only if conversion succeeded
        if conversion_successful:
            try:
                os.remove(png_path)
                print(f"Deleted original: {filename}")
            except Exception as e:
                print(f"Error deleting {filename}: {e}")

    print("\nBatch operation complete.")

if __name__ == "__main__":
    folder = input("Enter the folder path: ").strip().strip('"')
    batch_convert_and_delete(folder)