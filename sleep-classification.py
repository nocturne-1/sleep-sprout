import requests

import os
from dotenv import load_dotenv
load_dotenv()

skin_temp = 60 #Placeholder until firebase integration
body_movement_count = 10 #Placeholder until firebase integration
sound_count = 4 #Placeholder until firebase integration




url = 'https://ai.hackclub.com/proxy/v1/chat/completions'
key = os.getenv('key')

headers = {
    'Authorization': 'Bearer '+ key,
    'Content-Type': 'application/json'
}
data = {
    'model': 'openai/gpt-5-mini',
    'messages': [
        {'role': 'user', 
         'content': f"""
You are a somnologist with a medical training and expertise in REM sleep classification. 
Based on the following data, reliably classify as REM Sleep or Non-REM sleep. Please use expert-level analysis and mimic the choices of a licensed doctor. Use the following literature to make your decision:

Skin temp and REM sleep relationship: 
Study Objectives: Skin temperature manipulation with little or no change in core body temperature affects sleep–wake states; however, the association of 24-hour skin temperature variation with sleep quality has not been investigated in a large-scale population. We examined the association between the circadian rhythm of distal skin temperature and sleep quality in real-life settings and aimed to provide additional evidence of the link between thermoregulation and sleep–wake states.
Methods: In this cross-sectional study of 2,187 community-dwelling adults, we measured distal skin temperature at the ventral forearm at 3-minute intervals for 7 consecutive days to calculate nonparametric indicators of a circadian skin temperature rhythm, including intradaily variability, interdaily stability, and relative amplitude. Participants underwent simultaneous 7-day wrist actigraphy to objectively measure sleep quality. The association between nonparametric circadian skin temperature rhythm indicators and 7-day sleep measures was evaluated using multivariable linear regression models.
Results: Lower intradaily variability and higher interdaily stability and relative amplitude of distal skin temperature were significantly associated with higher sleep efficiency, shorter wake after sleep onset, and longer total sleep time (all P < .001). After adjusting for demographic, clinical, and environmental factors, the coefficients for the linear trend of sleep efficiency were −1.20 (95% confidence interval: −1.53, −0.87), 1.08 (95% confidence interval: 0.80–1.36), and 1.47 (95% confidence interval: 1.04–1.89) per quartile increase in intradaily variability, interdaily stability, and relative amplitude, respectively (all P < .001).
Conclusions: Distal skin temperature with lower fluctuations and higher regularity and rhythm amplitudes was associated with better sleep quality. Our results could be applied in chronobiological interventions to improve sleep quality. After excluding 37, 18, and 41 participants who did not complete the self-reported diary, actigraphic sleep measurements, and DStemp measurements, respectively, 2,187 participants were included in the analysis. The participants’ characteristics are described in Table 1. Participants had a mean age of 68.8 (standard deviation: 8.0) years and 63.9% were female. Their mean SE, WASO, TST, log-transformed SOL, and log-transformed FI were 83.5 (7.3)%, 36.8 (21.9) minutes, 380.6 (65.1) minutes, 2.66 (0.68) log-minutes, and 1.23 (0.42), respectively. Medians (interquartile ranges) of time spent outdoors were 192 (92–288) minutes and 195 (91–313) minutes in low and high DStemp groups, respectively. The early chronotype group had significantly higher IS (median 0.497 [interquartile range: 0.358–0.618] vs 0.476 [0.326–0.601], P = .002), lower M5 (35.18 [34.81 − 35.48] vs 35.23 [34.86–35.54], P = .006), earlier TM5 (1:00 [0:49–2:00] vs 2:27 [2:33–3:18], P < .001), and earlier TL10 (11:30 [10:30–12:18] vs 12:42 [11:45–13:30], P < .001) than the late chronotype group. However, IV, RA, and L10 did not differ between the early and late chronotype groups (median 0.042 [interquartile range: 0.026–0.063] vs 0.040 [0.026–0.040], P = .830; 0.032 [0.017–0.056] vs 0.035 [0.017–0.058], P = .446; and 32.76 [31.34–33.90] vs 32.72 [31.39–33.85], P = .988, respectively). The intraclass correlation coefficients for within-individual variation in SE, WASO, log-transformed SOL, TST, log-transformed FI, 24-hour DStemp, 24-hour outdoor temperature, and 24-hour ambient temperature were 0.76 (95% confidence interval [CI]: 0.75–0.78), 0.62 (95% CI: 0.58–0.66), 0.59 (95% CI: 0.56–0.62), 0.86 (95% CI: 0.85–0.87), 0.90 (95% CI: 0.89–0.91), 0.91 (95% CI: 0.90–0.92), 0.99 (95% CI: 0.98–0.99), and 0.99 (95% CI: 0.99–0.99), respectively.

Bodily movement and REM sleep: relationship:
Nocturnal body motility and autonomic nervous system (ANS) activity as manifested in respiratory movements and the pumping action of the heart (ballistocardiogram, BCG) registered by using the static charge sensitive bed (SCSB) method were investigated in five studies. The SCSB data were classified into quiet (QS), intermediate (IS) and active (AS) states according to the frequency of small body movements and the regularity of the ANS parameters. These states and body movements per se were assessed as measures of sleep quality. QS, IS, and AS were also studied in relation to dreaming. Both visual (Study I) and automatic (Study III) analyses revealed that the changes in different SCSB variables and in the activity states reflect the cyclic variation of the standard sleep stages. QS and IS were mainly related to NREM sleep, but while REM sleep was mostly scored as AS, the total nocturnal AS was a combination of wakefulness, stages 1 and 2, and REM sleep. The percentages of dream recall (Study II) after QS (20%) and IS (25%) confirmed their association with NREM sleep, whereas the recall rate in AS (80%) was comparable with the percentages usually found after REM awakenings. Study IV using behavioral responsiveness as a measure of sleep depth showed similar kinds of differences between the SCSB activity states as were found between the standard sleep stages, the amount of QS appearing to be a useful indicator of deep sleep. Study V revealed significant inter-subject differences in the SCSB parameters but also a noteworthy intra-subject variation across 14 consecutive nights was found. The subjective sleep evaluations during the individual extremes of SCSB activity significantly differed from each other, quiet SCSB recording indicating subjectively good sleep. Studies I-IV indicate that SCSB activity analysis provides a simple and inexpensive method for assessing sleep quality and for dream research. According to Study V the validity of single-night recordings as measures of sleep quality should be questioned, especially as regards experimental settings with small number of subjects. Nevertheless, the SCSB appears to be a suitable method when repeated recordings are needed, as in follow-up studies.

Bodily movement and REM sleep: relationship:
The rate at which body movement occurs during sleep is an important element in the estimation of sleep stages. Thus, "body movement density (BMD)", the number of body movements that occur over a period of time, can be used as an index reflecting the quantity of actual body movements measured using an infrared motion sensor. In the present study, sleep stage determined by polysomnography (PSG) as the main physiology index is compared to body movement data. The stages of sleep follow the international standards of Rechtschaffen and Kales. The transitions between sleep levels within the sleep cycle and changes in BMD were synchronous. Using the proposed method, a concordance rate of 76.9% (SD±24.0) between the BMD cycle and sleep cycle was obtained. Therefore, estimating the changes in sleep cycles is possible using only BMD.

Bodily movement and REM sleep: relationship:
Disturbed sleep has become more common in recent years. To increase the quality of sleep, undergoing sleep observation has gained interest as an attempt to resolve possible problems. In this paper, we evaluate a non-restrictive and non-contact method for classifying real-time sleep stages and report on its potential applications. The proposed system measures body movements and respiratory signals of a sleeping person using a multiple 24-GHz microwave radar placed beneath the mattress. We determined a body-movement index to identify wake and sleep periods, and fluctuation indices of respiratory intervals to identify sleep stages. For identifying wake and sleep periods, the rate agreement between the body-movement index and the reference result using the R&K method was 83.5 ± 6.3%. One-minute standard deviations, one of the fluctuation indices of respiratory intervals, had a high degree of contribution and showed a significant difference across the three sleep stages (REM, LIGHT, and DEEP; p < 0.001). Although the degree that the 5-min fractal dimension contributed—another fluctuation index—was not as high as expected, its difference between REM and DEEP sleep was significant (p < 0.05). We applied a linear discriminant function to classify wake or sleep periods and to estimate the three sleep stages. The accuracy was 79.3% for classification and 71.9% for estimation. This is a novel system for measuring body movements and body-surface movements that are induced by respiration and for measuring high sensitivity pulse waves using multiple radar signals. This method simplifies measurement of sleep stages and may be employed at nursing care facilities or by the general public to increase sleep quality.

Snoring (determined by if sound is detected) and REM sleep:
Obstructive respiratory events are predominantly, albeit not exclusively, present in REMS in school-aged children. NREMS respiratory events are more likely in the presence of lower oxyhaemoglobin saturations during event, side body position and in African–American children. However, REMS dominance is not affected by either BMI z-score or obesity. Our findings suggest that incorporating comprehensive respiratory event profiles of children may enhance our understanding of the pathophysiology and adverse outcomes in the context of paediatric OSA.

Sleeptalking (determined by if sound is detected) and REM sleep:
Background: Sleep talking (ST) is characterized by the production of unaware verbal vocal activations (VBs) during sleep. ST seems potentially linked to linguistic and memory consolidation processes. However, sleep and dream characteristics and the relationship between verbal vocalizations (VBs) and cognitive functions are still unknown. Our study aimed to investigate qualitative sleep and dream features in sleep talkers (STs) compared to healthy subjects (CNTs) through retrospective and longitudinal measures and explore the relationship between ST and memory consolidation. Methods: We recruited N = 29 STs and N = 30 CNTs (age range of 18–35). Participants recorded their dreams and filled out sleep logs for seven consecutive days. Vocal activations of STs were audio-recorded. On the eighth day, we administered a word-pair task. Results: We showed that STs had significantly worse self-reported sleep quality. VBs were positively correlated with sleep fragmentation and negatively associated with the oneiric emotional load. No difference between groups was found in the memory consolidation rate. Conclusions: Although ST is a benign phenomenon, we revealed that ST is associated with more sleep alterations and lower emotional intensity of dreams. In this vein, we support that ST depends on sleep fragmentation and could represent a potential window into sleep-dependent cognitive processes.

Based on literature, use this data to classify REM sleep or Non-REM sleep:
skin temperature (in degrees Fahrenheit): {skin_temp}
how many times body movement is detected (resets after every 30-minute interval): {body_movement_count}
how many times sounds (snoring/sleeptalking) are detected (resets after every 30-minute interval): {sound_count}


Return only one of the following answers: "REM Sleep" or "Non-REM Sleep". DO NOT RETURN ANY OTHER TEXT/NUMBERS/VALUES!
"""
         }
        
    ]
}

response = requests.post(url, headers=headers, json=data)
res_json = response.json()
assistant_reply = res_json["choices"][0]["message"]["content"]
print(assistant_reply)
#print(response.json())
