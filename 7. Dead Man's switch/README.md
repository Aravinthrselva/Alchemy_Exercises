## Dead Man's Switch 
A dead man's switch is a term used in many cases. 
The idea is pretty simple: if someone should become incapacitated, 
there is a way to detect it and act on it.

For our particular case we'll create a mechanism 
where the owner of a contract will need to ping or notify a contract every 52 weeks. 
If there is no activity during this time period, the recipient will be able to withdraw the funds. 
The assumption here is that the owner is no longer able to do so.

We use 52 weeks as opposed to a year since weeks are an available global time unit in solidity: 
52 weeks is valid code. 
Years are not globally available units due to leap years.