$ErrorActionPreference = 'Stop'
$projectRoot = Split-Path -Parent $PSScriptRoot
$assetRoot = Join-Path $projectRoot 'assets'
New-Item -ItemType Directory -Path $assetRoot -Force | Out-Null
$photos = @(
    @{ Name = 'hero.jpg'; Id = 'photo-1512621776951-a57141f2eefd'; Width = 1400 },
    @{ Name = 'salmon.jpg'; Id = 'photo-1467003909585-2f8a72700288'; Width = 900 },
    @{ Name = 'salad.jpg'; Id = 'photo-1511690743698-d9d85f2fbf38'; Width = 900 },
    @{ Name = 'cake.jpg'; Id = 'photo-1533134242443-d4fd215305ad'; Width = 900 },
    @{ Name = 'pasta.jpg'; Id = 'photo-1473093295043-cdd812d0e601'; Width = 900 },
    @{ Name = 'toast.jpg'; Id = 'photo-1525351484163-7529414344d8'; Width = 900 },
    @{ Name = 'pancake.jpg'; Id = 'photo-1528207776546-365bb710ee93'; Width = 900 },
    @{ Name = 'story.jpg'; Id = 'photo-1414235077428-338989a2e8c0'; Width = 1000 },
    @{ Name = 'visit.jpg'; Id = 'photo-1552566626-52f8b828add9'; Width = 1100 }
)
foreach ($photo in $photos) {
    $uri = 'https://images.unsplash.com/' + $photo.Id + '?auto=format&fit=crop&w=' + $photo.Width + '&q=85'
    Invoke-WebRequest -Uri $uri -OutFile (Join-Path $assetRoot $photo.Name) -UseBasicParsing -NoProxy -TimeoutSec 45
    Write-Output ('Downloaded ' + $photo.Name)
}
$source = (Get-Content -LiteralPath (Join-Path $projectRoot 'index.html') -Raw -Encoding UTF8) + (Get-Content -LiteralPath (Join-Path $projectRoot 'app.js') -Raw -Encoding UTF8)
$characters = -join ([regex]::Matches($source, '[\u3400-\u9fff\u3000-\u303f\uff00-\uffef]') | ForEach-Object { $_.Value } | Sort-Object -Unique)
$fontUri = 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@500&display=swap&text=' + [uri]::EscapeDataString($characters)
$fontCss = (Invoke-WebRequest -Uri $fontUri -UseBasicParsing -NoProxy -TimeoutSec 45).Content
$fontMatch = [regex]::Match($fontCss, 'url\((https://[^)]+)\)')
if (!$fontMatch.Success) { throw 'Font URL missing from response.' }
Invoke-WebRequest -Uri $fontMatch.Groups[1].Value -OutFile (Join-Path $assetRoot 'noto-serif-sc.woff2') -UseBasicParsing -NoProxy -TimeoutSec 45
Write-Output 'Downloaded Chinese display font'
