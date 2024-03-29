SELECT
  date_trunc('day', minute) AS day,
  avg(price) AS price
FROM
  prices.usd
WHERE
  blockchain = '{{Network}}'
  AND date_trunc('year', minute) = CAST('{{YEAR}}-01-01' AS timestamp)
  AN contract_address = from_hex('{{TokenAddress}}')
GROUP BY
  date_trunc('day', minute)
