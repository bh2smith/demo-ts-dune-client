select 
    date_trunc('day', minute) as day, 
    avg(price) as price
from prices.usd 
where blockchain = '{{Network}}' 
and date_trunc('year', minute) = cast('{{YEAR}}-01-01' as timestamp)
and contract_address = from_hex('{{TokenAddress}}')
group by date_trunc('day', minute)
