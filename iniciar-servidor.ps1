# Servidor local para o portifólio Peter.MP4
# Execute este script e acesse: http://localhost:3000

$port = 3000
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".mp4"  = "video/mp4"
    ".woff2"= "font/woff2"
    ".woff" = "font/woff"
    ".ttf"  = "font/ttf"
    ".json" = "application/json"
}

$http = [System.Net.HttpListener]::new()
$http.Prefixes.Add("http://localhost:$port/")
$http.Start()

Write-Host ""
Write-Host "  ================================================" -ForegroundColor Cyan
Write-Host "   PETER.MP4 — Servidor local rodando!" -ForegroundColor Yellow
Write-Host "  ================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Acesse no navegador:" -ForegroundColor White
Write-Host "  http://localhost:$port" -ForegroundColor Green
Write-Host ""
Write-Host "  Pressione CTRL+C para encerrar o servidor." -ForegroundColor Gray
Write-Host ""

# Abre o navegador automaticamente
Start-Process "http://localhost:$port"

while ($http.IsListening) {
    $context = $http.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath
    if ($urlPath -eq "/" -or $urlPath -eq "") { $urlPath = "/index.html" }

    $filePath = Join-Path $root ($urlPath.TrimStart("/").Replace("/", "\"))

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $response.ContentType = $mime
        $response.StatusCode = 200
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.OutputStream.Write($body, 0, $body.Length)
    }

    $response.OutputStream.Close()
}
