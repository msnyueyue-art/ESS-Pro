# 将所有触摸屏页面的初始内容改为英文，避免加载时闪动

$files = @("home.html", "data.html", "history.html", "control.html", "alarms.html", "logs.html", "settings.html")

$replacements = @{
    '>储能柜管理系统<' = '>Energy Storage System<'
    '>首页<' = '>Home<'
    '>数据<' = '>Data<'
    '>历史<' = '>History<'
    '>控制<' = '>Control<'
    '>告警<' = '>Alarm<'
    '>日志<' = '>Log<'
    '>设置<' = '>Settings<'
    '>运行天数<' = '>Running Days<'
    '>系统功率<' = '>System Power<'
    '>今日充电量<' = '>Today Charge<'
    '>今日放电量<' = '>Today Discharge<'
    '>累计充电量<' = '>Total Charge<'
    '>累计放电量<' = '>Total Discharge<'
    '>退出登录<' = '>Logout<'
    '>取消<' = '>Cancel<'
    '>确定<' = '>Confirm<'
}

foreach ($file in $files) {
    $filePath = Join-Path "." $file

    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8

        foreach ($key in $replacements.Keys) {
            $content = $content -replace [regex]::Escape($key), $replacements[$key]
        }

        $content | Set-Content $filePath -Encoding UTF8 -NoNewline
        Write-Host "Updated: $file" -ForegroundColor Green
    } else {
        Write-Host "Not found: $file" -ForegroundColor Yellow
    }
}

Write-Host "`nDone!" -ForegroundColor Cyan
