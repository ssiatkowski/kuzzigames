$ErrorActionPreference = 'Stop'
$englishPath = Join-Path $PSScriptRoot 'en.ts'
$englishSource = Get-Content -LiteralPath $englishPath -Raw -Encoding utf8
$catalogMatch = [regex]::Match($englishSource, '(?s)  catalogMarkup: `(.*?)`,')
$descriptionMatch = [regex]::Match($englishSource, "  catalogDescription: '([^']*)',")
if (-not $catalogMatch.Success -or -not $descriptionMatch.Success) {
  throw 'English catalog source is missing.'
}
$homepagePath = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '../index.html'))
$homepage = Get-Content -LiteralPath $homepagePath -Raw -Encoding utf8
$cardPattern = '(?s)        <a class="game-card" href="\./order_of_magnitude/".*?</a>'
if ([regex]::Matches($homepage, $cardPattern).Count -ne 1) {
  throw 'The homepage must contain exactly one Order of Magnitude card.'
}
$catalogCard = $catalogMatch.Groups[1].Value
$catalogDescription = [System.Net.WebUtility]::HtmlEncode($descriptionMatch.Groups[1].Value)
$homepage = [regex]::Replace($homepage, $cardPattern, [System.Text.RegularExpressions.MatchEvaluator]{ param($match) $catalogCard })
$homepage = [regex]::Replace($homepage, '<meta name="description" content="[^"]*" />', [System.Text.RegularExpressions.MatchEvaluator]{ param($match) '<meta name="description" content="' + $catalogDescription + '" />' })
$encoding = [System.Text.UTF8Encoding]::new($false)
[System.IO.File]::WriteAllText($homepagePath, $homepage, $encoding)
[System.IO.File]::WriteAllText((Join-Path $PSScriptRoot 'en.js'), $englishSource, $encoding)
