$files = Get-ChildItem "c:\Users\HP\Ideamagix copy\salesforce\css" -Filter *.scss | Where-Object { $_.Name -ne 'variable.scss' }
$colors = @{}

foreach ($file in $files) {
    $content = Get-Content $file.FullName
    $matches = [regex]::Matches($content, '#([0-9a-fA-F]{3,6})\b')
    foreach ($match in $matches) {
        $color = $match.Value.ToLower()
        # Normalize 3-hex to 6-hex for counting transparency? No, SCSS handles both. 
        # Just keep as is but lower case.
        if ($colors.ContainsKey($color)) {
            $colors[$color]++
        }
        else {
            $colors[$color] = 1
        }
    }
}

$colors.GetEnumerator() | Sort-Object Value -Descending | Format-Table -AutoSize
