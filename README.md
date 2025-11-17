// README <br>

Voted top 5 out of 50+ teams!!

About : <br>

**Made by: Emma, Vijeta, and Arianna**

Deplyed WebApp Url: https://sleep-sprout.netlify.app <br>
Hardware demo: https://youtube.com/shorts/LbsjMjQvkws?si=fBNwM8ppvN45Ym33 <br> 

When we asked our fellow Parthenon members if they got enough sleep at night, none of them raised their hands. In fact, 70-80% of highschoolers are chronically sleep deprived (a conditional that is severely detrimental to mental, emotional, and physical health)! 

Sleep-sprout guilts, cajoles, and shames you into sleep by representing your health via trusty plant companion Mr. Sprout (or whatever name you assign to it, we hope that you form an emotional connections with your pet). 

This plant will blossom if users get appropriate amount of sleep, and wither away if they do not. The Sleep-sprout webapp is also paired with its wearable armband which detects how long a user sleeps + their sleep health. Don't let your plant whither away and get sleep!<br> **Plant >>> Math test next morning ** <br>

Inputs we took to monitor sleep:<br>
* temperature, movement, sound sensor (snoring), time (duration of sleep)


Bill of materials: <br>
*Adafruit Circuit Playground Classic<br>
*Temperature & Humidity sensor<br>
*Cotton Fabric + regular thread<br>
*Conductive thread<br>
*Connectors I/O wires <br>
*GUM WRAPPERS! <br>
*Tape <br>


Schematic:
*attached in repo

How we calculated our sleep scores: 

Our final sleep score was the weighted sum of sleep duration and sleep quality for a comprehensive analysis of sleeping habits. 

Duration score: **Total time slept** / 10 (this is considered a general perfect amount of sleep per night for all demographics)

REM Sleep Score: We detected movement, changes in temeperature, and snores to classify 30-minute periods as **non-REM** or **REM** sleep. Then, we compared this sequence of REM stages to the optimal regression to recieve this score from 1-4.

Final score: Duration and REM Sleep Score are fit to 0-1 scale and a weighted sum is calculated, with REM Sleep Score, which measures intensity, recieving slightly more weight.


@Athena hacks Parthenon!!!
