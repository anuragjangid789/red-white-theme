Add-Type -AssemblyName System.Drawing

$assetsDir = "c:\Users\Genius\OneDrive\Desktop\project 4 -red&white website\public\assets"
$images = @(
    "mayra png.webp",
    "haldi png.webp",
    "sangeet png.webp",
    "wedding png.webp",
    "wedding png 2.webp",
    "red flower.webp",
    "pearl png.webp"
)

# First convert any webp to png using msedge or chrome if needed, or check if System.Drawing can load webp
foreach ($img in $images) {
    $srcPath = Join-Path $assetsDir $img
    $cleanName = $img -replace "\.webp$", "_clean.png" -replace " png", ""
    $cleanPath = Join-Path $assetsDir $cleanName

    Write-Host "Processing $img -> $cleanName"
    try {
        # Test loading directly with System.Drawing
        $bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
        $newBmp = New-Object System.Drawing.Bitmap($bmp.Width, $bmp.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
        
        for ($x = 0; $x -lt $bmp.Width; $x++) {
            for ($y = 0; $y -lt $bmp.Height; $y++) {
                $pixel = $bmp.GetPixel($x, $y)
                $r = $pixel.R
                $g = $pixel.G
                $b = $pixel.B
                $avg = ($r + $g + $b) / 3.0
                $diff = [Math]::Max([Math]::Abs($r - $g), [Math]::Max([Math]::Abs($g - $b), [Math]::Abs($r - $b)))
                
                # If near-white background
                if ($avg -gt 240 -and $diff -lt 14) {
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
                } elseif ($avg -gt 225 -and $diff -lt 18) {
                    $factor = ($avg - 225.0) / 15.0
                    $alpha = [int]($pixel.A * (1.0 - $factor))
                    if ($alpha -lt 0) { $alpha = 0 }
                    if ($alpha -gt 255) { $alpha = 255 }
                    $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $r, $g, $b))
                } else {
                    $newBmp.SetPixel($x, $y, $pixel)
                }
            }
        }
        $bmp.Dispose()
        $newBmp.Save($cleanPath, [System.Drawing.Imaging.ImageFormat]::Png)
        $newBmp.Dispose()
        Write-Host "SUCCESS: Saved $cleanName"
    } catch {
        Write-Host "Direct load error on $img : $($_.Exception.Message)"
    }
}
