# PerSecond

generate statistics about a running process, count events or rates, per second, 
or average a value within a window (i.e average response time)

  * requests per second
  * avg response time
  * avg response size
  * data per second
  
new Persecond({persecond: 60, percount: false}, windowLength, N)
//if 60 then calculate statistic per second (i.e. else divide by count)
//every window length emit the current mean, and mean and stddev of the last N windows

i.e new PerSecond({request: 60, resTime: false}, 60e3, 60) 
//average every minute, keep track of last hour 

(we will need to balance for the peaks. can calculate that with stddev)

event ('name') //count 1 event

every minute (windowLength) emit aggregated stats

average events per second, stddev

event ('resTime', ms) // register a response time of ms milliseconds.
