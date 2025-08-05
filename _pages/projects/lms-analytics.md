---
title: "RDAMP_LMS_Analytics_RCHG"
permalink: /projects/lms-analytics/
excerpt: "This project looked at how Rychtenshane Community Housing Group staff used their online training system from 2018 to mid-2025."
header:
  image: /assets/images/Engagement Patterns.jpg
  teaser: /assets/images/Engagement Patterns.jpg
---
# RDAMP_LMS_Analytics_RCHG
### Project summary

This project looked at how Rychtenshane Community Housing Group staff used their online training system from 2018 to mid-2025. We used Power BI and Excel to spot patterns in how people were engaging with courses, completing them, developing skills, giving feedback and using accessibility tools.

### Dashboard views

**Compliance and Training Summary**

![Compliance Summary](Dashboard/Screenshots/Compliance%20&%20Training%20Summary.png)

This dashboard tracks compliance and training activity across departments, showing overall completion rates, overdue course counts, and how training trends have evolved from 2018 to 2025.

**Performance Analysis**
![Performance Analysis](Dashboard/Screenshots/Performance%20Analysis.png)

This view highlights team-based skill ratings and tracks the evolution of employee feedback throughout the year. It also reveals that nearly two-thirds of staff members show flagged gaps in core competencies, guiding where targeted development efforts may be needed.

**Engagement Patterns**
![Engagement Trends](Dashboard/Screenshots/Engagement%20Patterns.png)

This visualization explores LMS engagement patterns, breaking down course duration by job role and location, and showing access trends across devices. It also tracks monthly enrollment versus activity rates from 2018 to 2025.

**Accessibility Overview**
![Accessibility Insights](Dashboard/Screenshots/Accessibility%20Overview.png)

This accessibility-focused dashboard presents key user statistics, showing that nearly 20% of courses were undertaken via screen reader. It also breaks down feedback sentiment across rating categories, helping assess courses ranking among diverse user groups.

You can find feedback count, percentage of training completed with a screen reader, avergae feedback ratings, and performance comparisons for users with accessibility needs.

**Statistical Insights**
![Advanced Analysis](Dashboard/Screenshots/Statistical%20Insights.png)

The dashboard shows no significant differences in performance across departments, while forecasting a downward trend in training completions. It also reveals a link between training time and frequency with performance, supporting better course design moving forward.

It includes ANOVA results, average skills score per team, forecasting of training completions for next quarter, and regression on training time vs performance.

### DAX measures used

Complex measures were created by using CALCULATE, USERELATIONSHIP and DIVIDE to support insights such as:

- % of completed mandatory courses
- Overdue training trends
- Average feedback rating
- Device usage breakdown
- Skill gap distribution

### Statistical techniques summary

- **Descriptive Statistics:** Summarizes data using averages, percentages and counts to highlight completion rates, skill scores and feedback ratings.
- **Comparative Analysis:** Compares performance and engagement across roles, departments, devices and accessibility groups.
- **Trend Analysis Over Time:** Tracks patterns in training activity, enrollment and feedback over months and years to reveal seasonality.
- **Outlier Detection:** Identifies overdue courses or unusual performance levels that deviate from expected norms.
- **Skill Gap Assessment:** Flags teams falling below benchmarks in key competency areas.
- **Accessibility Segmentation:** Breaks down feedback and usage statistics between screen reader users and general users.
- **Correlation Exploration:** Visually checks for relationships between variables like feedback scores and course completion.
- **ANOVA (Analysis of Variance):** Tests whether performance differences across groups (e.g. departments) are statistically significant. Excel Data Analysis Toolpack (Two-Factor ANOVA)
- **Forecasting:** Predicts future training completion patterns using historical trends. Power BI line chart with Analytics Pane forecast
- **Training Impact Modeling:** Explores how time spent on training relates to performance improvements using scatterplots.

### Assumptions

Due to inconsistencies in the original data field, we encountered challenges performing direct calculations. As a workaround, we segmented the data into broader time-based slices — such as month, year and quarter — to support reliable and consistent analysis throughout the project.

### Final results

How our analysis meets RCHG’s goals:

- *We found over 400 overdue courses*, including 102 required by law. This helps the company know where to act fast to stay compliant and avoid issues.
- *Boosts employee skills:* About 69% of staff had areas where they needed development. This lines up with the company’s mission to help people grow in their roles.
- *Improves course timing:* Most learning happens between May and August. Teams can use this insight to plan future training when people are most likely to take part.
- *Makes courses easier to complete:* When courses are longer than 75 minutes, people drop off. Shorter sessions will keep people engaged and support better learning.
- *Promotes inclusivity:* Around 20% of staff use screen readers, and they’re just as satisfied. This supports the company’s focus on making learning accessible for everyone.

### Team members

The team consisted of:

- [LinkedIn - Ciruthika Nithusyanthan](https://www.linkedin.com/in/ciruthika-nithusyanthan-0074524a) (GitHub: @Ciruthika52)
- [LinkedIn - Tongai Zinaka](https://www.linkedin.com/in/tongai-zinaka) (GitHub: @Tongai-Zinaka)
- [LinkedIn - Aamina Patel](https://www.linkedin.com/in/aamina-patel) (GitHub: @Aamina-Patel)
- [LinkedIn - Elena Losavio](https://www.linkedin.com/in/elena-losavio) (GitHub: @Elena-L13)
