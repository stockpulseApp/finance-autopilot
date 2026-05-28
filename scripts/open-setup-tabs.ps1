# Opens launch setup URLs in your default browser (Windows).
$urls = @(
  "https://wealthybrainiac.com/setup",
  "https://dashboard.stripe.com/apikeys",
  "https://dashboard.stripe.com/webhooks",
  "https://vercel.com/stock-pulse1/wealthy-brainiac/settings/environment-variables",
  "https://app.convertkit.com/users/signup",
  "https://affiliate-program.amazon.com/",
  "https://www.cardratings.com/affiliate-center/",
  "https://impact.com/partners/",
  "https://www.fidelity.com/customer-service/affiliate-program",
  "https://www.policygenius.com/affiliates",
  "https://wealthybrainiac.com/earn",
  "https://search.google.com/search-console"
)

foreach ($url in $urls) {
  Start-Process $url
  Start-Sleep -Milliseconds 400
}

Write-Host "Opened $($urls.Count) setup tabs."
