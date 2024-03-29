with results as (
    select
      date_trunc('month', evt_block_time) as month,
      sum(case when "from" = 0x0000000000000000000000000000000000000000 then 1 else 0 end) as mints,
      sum(case when "from" != 0x0000000000000000000000000000000000000000 then 1 else 0 end) as non_mints
    from
      erc20_{{network}}.evt_Transfer
    group by
      date_trunc('month', evt_block_time)
)

select 
    month,
    concat(
        '<a href="https://dune.com/queries/3124052?Month=', 
        substr(cast(month as varchar), 1, 10), 
        '+00%3A00%3A00&sidebar=none" target="_blank">link</a>'
    ) as zoom,
    mints,
    non_mints,
    sum(mints) over (order by month) as cumulative_mints,
    sum(non_mints) over (order by month) as cumulative_non_mints
from results
order by month
