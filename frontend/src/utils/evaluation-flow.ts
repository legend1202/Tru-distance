export const flowData = [
  {
    type: 'scope',
    status: 0, // 0 not start, 1: correct, 2: not correct
    title: 'Scope Section',
    children: [
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        intro: 'Read the SOW section below:',
        question1: '4.1.1.a-Q1: Is the SOW language complete, and correct?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [0, 1],
        no1: [0, 2],
        answer: 0, // Default value for answer
        question2: '', // Default value for question2
        description2: '', // Default value for description2
        yes2: [], // Default value for yes2
        no2: [], // Default value for no2
        narrative: '', // Default value for narrative
        next: [0, 1], // Default value for next
        prev: [],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        question1:
          '4.1.1.a-Q2: Is the SOW language concise enough to provide the government the ability to determine if the contractor is not doing the job satisfactorily? ',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [0, 3],
        no1: [0, 2],
        next: [0, 3], // Default value for next
        prev: [0, 0], // Default value for next
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        question1: 'Redline the SOW in the section below:',
        description1:
          'Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
        next: [0, 3],
        prev: [0, 1],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        intro: 'Read the SOW section, and Assumptions section below',
        question1: '4.1.2-Q1: Do you believe that the SOW section(s) encompass the assumptions? ',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        no1: [0, 4],
        yes1: [0, 5],
        question2: '', // Default value for question2
        description2: '', // Default value for description2
        yes2: [], // Default value for yes2
        no2: [], // Default value for no2
        narrative: '', // Default value for narrative
        next: [0, 4], // Default value for next
        prev: [0, 0],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0,
        question1:
          '4.1.2-Q2: Provide narrative of how SOW doesn’t align with assumptions in box below (narrative box Section 1: Page 4.1.2-Q2.)',
        description1: 'Assumptions',
        next: [0, 5],
        prev: [0, 3],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        intro: '4.1.2-Q3: Read the SOW section, and Assumptions section below',
        question1: 'Do you recommend any modifications to the SOW (adds, deletes, re-words)?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [0, 6],
        no1: [0, 7],
        next: [0, 6],
        prev: [0, 3],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        question1:
          '4.1.2-Q4: Provide narrative of how SOW doesn’t align with assumptions in box below (narrative box Section 1: Page 4.1.2-Q2.)',
        description1:
          'Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
        next: [0, 7],
        prev: [0, 5],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        intro: ' Read the SOW section, WBS Descriptions and Task Descriptions below: ',
        question1:
          '4.1.3-Q1: Do you believe that the SOW section(s) encompass all of the CDRLs required?',
        description1:
          'SOW Language (SOW language specifically associated only with this WBS) \n \nCDRLs are highlighted and bold and provide a link to each CDRL (Form 1423’s).  They open in PDFs in new page. ',
        yes1: [0, 9],
        no1: [0, 8],
        next: [0, 9],
        prev: [0, 6],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        question1:
          '4.1.3-Q2: Provide missing CDRLs needed in the SOW in box below (narrative box Page 4.1.3-Q2.) ',
        description1: 'Recommended CDRLs:',
        description2:
          'Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
        narrative: '',
        next: [0, 9],
        prev: [0, 7],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        intro: 'Read the SOW section, and WBS Description below: ',
        question1:
          '4.1.4.Q1: Do you believe that the SOW section(s) encompass the work in the WBS, and that the WBS Descriptions address the requirements in the SOW?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [0, 11],
        no1: [0, 10],
        next: [0, 11],
        prev: [0, 7],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        question1:
          '4.1.4-Q2: Provide narrative of how SOW doesn’t align with WBS Descriptions in box below (narrative box Section 1: Page 4.1.4-Q2.)',
        description1: 'WBS Description',
        description2: '1.4.Q2 Narrative',
        narrative: '',
        prev: [0, 9],
        next: [0, 11],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        intro: 'Read the SOW section, and WBS Description below: ',
        question1:
          '4.1.4-Q3: Do you recommend any modifications to the SOW (adds, deletes, re-words)?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [0, 12],
        no1: [1, 0],
        prev: [0, 9],
        next: [0, 12],
      },
      {
        status1: 0, // 0 not start, 1: correct, 2: not correct
        status2: 0, // 0 not start, 1: correct, 2: not correct
        number: '4.1.4-Q4',
        question1:
          '4.1.4-Q4: Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
        description1: 'WBS Description',
        narrative: '',
        prev: [0, 11],
        next: [1, 0],
      },
    ],
  },
  {
    type: 'Methodology',
    code: '4.2',
    title: 'Evaluate Methodology:',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        number: '4.2.1-Q1',
        intro: 'Read the BOE to the right ',
        question1:
          '4.2.1-Q1: What type of Methodology approach was used: (Provide a small help link next to each answer or make the answer a link that provides a pop-up description of each methodology) Get descriptions from DAU.',
        moveOptions: [
          {
            title: 'Analogous Methodology (Historical actuals);',
            next: [1, 1],
          },
          {
            title: 'Cost Estimating Relationship (CER) Methodology',
            next: [1, 2],
          },
          {
            title: 'Task Based or Bottoms Up Methodology',
            next: [1, 3],
          },
          {
            title: 'Level of Effort (LOE) Methodology',
            next: [1, 6],
          },
          {
            title: 'Engineering Judgment Methodology',
            next: [1, 8],
          },
        ],
        description3:
          'Displays information about what the definition of the options above when selecting the links above.',
        prev: [0, 11],
        next: [1, 0],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        number: '4.2.1.a-Q1',
        intro: 'Read the BOE to the right ',
        question1:
          '4.2.1.a-Q1: Analogous Methodology: Do you believe that the justification provided as part of the Methodology uses actuals with similar work to the work in the WBS/Task? ',
        question2:
          '4.2.1.a-Q2: Provide what level of similarity you believe that the provided actual work is to the WBS/Task work: Provide Justification for Analogous methodology level of similarity determination',
        description3: 'BOE for WBS',
        description2: 'Enter Justification here…',
        description4: 'BOE for Task',
        selectOptions: [
          '(a)Not at all: 0%',
          'Low Similarity: 1-25%',
          'Low-Medium Similarity: 26-50%',
          '(d)Medium Similarity: 51-70%',
          'Medium-High Similarity: 71-90%',
          'High Similarity: 90-100%',
        ],
        prev: [1, 0],
        next: [1, 0],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        number: '4.2.1.a-Q1',
        intro: 'Read the BOE to the right ',
        question1:
          '4.2.1.b.Q1: Cost Estimating Relationship (CER): Do you believe that the justification provided as part of the Methodology uses actuals with similar work to the work in the WBS/Task? ',
        question2:
          '4.2.1.b-Q2: Provide what level of similarity you believe that the provided actual work is to the WBS/Task work: Provide Justification for Analogous methodology level of similarity determination',
        description3: 'BOE for WBS',
        description2: 'Enter Justification here…',
        description4: 'BOE for Task',
        selectOptions: [
          '(a)Not at all: 0%',
          'Low Similarity: 1-25%',
          'Low-Medium Similarity: 26-50%',
          '(d)Medium Similarity: 51-70%',
          'Medium-High Similarity: 71-90%',
          'High Similarity: 90-100%',
        ],
        prev: [1, 0],
        next: [1, 0],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....

        question1:
          '4.2.1.c-Q1: Task Based or Bottoms Up Methodology: Are the tasks listed an accurate representation of the work needed to accomplish the description?',
        description1:
          'Task / Bottoms Up Estimating Definition: \n\nDefinition of Task/Bottoms up Estimating',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [1, 5],
        no1: [1, 4],
        prev: [1, 0],
        next: [1, 5],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.2.1.c-Q2 Provide narrative of why the Tasks listed are not an accurate resprentation of the work needed to accomplish the description. (narrative box Section 1: Page 4-4.2.1.c-Q2.)  (Answer data is collected and move to 2.1.c.Q3)',
        description1: 'Narrative / Justification',
        description3: 'BOE',
        prev: [1, 3],
        next: [1, 5],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.2.1.c-Q3: Task Based or Bottoms Up Methodology: Do the task hours seem reasonable for the work?',
        description1: 'BOE',
        description3: 'BOE',
        yes1: [1, 10],
        no1: [1, 10],
        prev: [1, 3],
        next: [1, 10],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.2.1.d-Q1: Is the work related to support type of work vs specific product delivery efforts?',
        description1: 'Level of Effort Definition: \n\nDefinition of',
        description3: 'BOE Language (Specific to WBS)',
        yes1: [1, 7],
        no1: [1, 7],
        prev: [1, 0],
        next: [1, 7],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.2.1.d-Q2: Does the work described in the SOW align with level of effort work activities?',
        description1: 'Narrative / Justification',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [1, 10],
        no1: [1, 10],
        prev: [1, 6],
        next: [1, 10],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1: '4.2.1.e-Q1: Was the justification provided understandable and logical?',
        description1: 'Please provide Justification for your response to the right/below;',
        description3: 'BOE Language (Specific to WBS)',
        yes1: [1, 9],
        no1: [1, 9],
        prev: [1, 0],
        next: [1, 9],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.2.1.e-Q2: Does the subject matter expert’s experience level aligned with the type of work and the provided justification?',
        description1: 'Please provide Justification for your response to the right/below;',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [1, 10],
        no1: [1, 10],
        prev: [1, 0],
        next: [1, 10],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro: 'Let’s look at other factors included as part of the methodology calculations:',
        question1:
          '4.2.2-Q1: Complexity, Risk and Learning Curve: Is a complexity factor contained within the methodology calculations?',
        question2:
          '4.2.2-Q2: Provide justification in the Narration/Justification input area below for concurrence or non-concurrence ',
        description3: 'BOE Language (Specific to WBS)',
        description4: 'SOW Language (SOW language specifically associated only with this WBS)',

        factor: {
          complexityValue: '15%',
          complexityConcur: '',
          complexityNonConcur: '',
          riskValue: '10%',
          riskConcur: '',
          riskNonConcur: '',
          curveValue: '25%',
          curveConcur: '',
          curveNonConcur: '',
        },
        factorJustification: {
          complexity: 'Narration / Justification:',
          risk: 'Narration / Justification:',
          curve: 'Narration / Justification:',
        },
        prev: [1, 9],
        next: [1, 11],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro: 'Let’s look at Methodology summary for this Task(X.Y.Z) (Display the Task #)',
        question1:
          '4.2.3-Q1: Do you agree with the overall Methodology Summary and your Narratives?  ',
        description1:
          'Methodology Determination from Page 4.2.1: (ONLY 1 of the below will appear, or indicated as selected item) \n\n\ta.Analogous \n\n\tb.Cost Estimating Relationship \n\n\tc.Task / Bottoms-Up  \n\n\td.Level of Effort \n\n\te.Engineering Judgement',
        description3: 'SBOE Language (Specific to WBS)',
        yes1: [1, 12],
        no1: [1, 10],
        prev: [1, 10],
        next: [2, 0],
      },
      {
        status1: 0,
        question1:
          '4.2.3-Q2: Review the Narratives below and select whether you are in agreement with the verbiage',
        description1: 'Narratives: (Show narrative verbiage from Page 4.2.1a-4.2.1e and 4.2.2)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [2, 0],
        no1: [1, 10],
        prev: [1, 10],
        next: [2, 0],
      },
    ],
  },
  {
    type: 'quantity',
    code: '4.3',
    title: 'Evaluate Quantity of Hours using methodology:',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours.  ',
        question1:
          '4.3.1-Q1: Do you agree that the number of hours proposed for the Task are needed to complete the work? ',
        description1: 'BOE Task Description',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [2, 2],
        no1: [2, 1],
        prev: [1, 10],
        next: [2, 1],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....',
        question1: '4.3.1-Q2: Are more or less hours needed?',
        description1: 'BOE Task Description',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [2, 2],
        no1: [2, 2],
        prev: [2, 0],
        next: [2, 2],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....',
        question1:
          'In the narrative boxes below, input the recommended # of hours and provide narrative and justification of narrative as to why the estimated number of hours is accurate or inaccurate for the Task. ',
        description1: 'BOE Hours:\n Estimated Hours \nRecommanded Hours',
        description3: 'Justification / Narration: ',
        prev: [2, 0],
        next: [2, 3],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....',
        question1:
          '4.3.1-Q4: Does the number of hours on this task overlap with other tasks (ie.. Are they charging for similar work across multiple Tasks or WBSs?) (Software would do an analysis on this and provide)',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [2, 4],
        no1: [3, 0],
        prev: [2, 2],
        next: [3, 0],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....',
        question1:
          '(5)4.3.1-Q5: In the narrative box below, please provide narrative and justification of narrative as to where you believe there is overlap of hours within tasks of the WBS.',
        description1: 'Narrative / Justification',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [2, 3],
        next: [3, 0],
      },
    ],
  },
  {
    type: 'pop',
    code: '4.4',
    title: ' Evaluate Distribution of Proposed Hours across provided period of performance (POP):',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro: 'Let’s look at how the hours are planned across the period of performance',
        question1:
          '4.4.1-Q1: Task Labor Categories: Do you agree that the Task Level hours are distributed appropriately across time in alignment with how the work should be performed?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [3, 2],
        no1: [3, 1],
        prev: [2, 3],
        next: [3, 1],
      },
      {
        status1: 0,
        question1:
          '4.4.1-Q2: Provide narrative and justification of narrative as to why the distribution of hours is not correct.',
        description1: 'Narrative / Justification',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [3, 0],
        next: [3, 2],
      },
      {
        status1: 0,
        question1: '4.4.1-Q3: Would you like to provide recommended distribution of hours?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [3, 3],
        no1: [4, 0],
        prev: [3, 1],
        next: [3, 3],
      },
      {
        status1: 0,
        question1:
          '4.4.1-Q4: Provide distribution of hours within the Period of Performance (POP) table Pop-up:',
        description1: 'Narrative / Justification',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [3, 2],
        next: [4, 0],
      },
    ],
  },
  {
    type: 'labor',
    code: '4.5',
    title: 'Evaluate Labor Categories ',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro:
          'Let’s look at the skillset of the proposed Labor Categories and determine if those are adequate for the work. (Show Task labor categories with links to pop-up of description of each)',
        question1:
          '4.5.1-Q1: Task Labor Categories: Do you agree that all of the different labor categories are needed for the overall WBS task?',
        description1: 'Labor Category Chart',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [5, 0],
        no1: [4, 1],
        prev: [3, 2],
        next: [5, 0],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.5.1-Q2: WBS Labor Categories: Do you agree that all of the different labor categories are needed for the overall WBS task?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [5, 0],
        no1: [5, 0],
        prev: [4, 0],
        next: [5, 0],
      },
    ],
  },
  {
    type: 'labor distribution',
    code: '4.6',
    title: 'Evaluate Labor Categories Distribution of work',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro: 'Next, let’s look at the labor categories for the work on this task',
        question1:
          '4.6.1-Q1: Do you agree that the labor categories are the correct type of skillsets to complete the work? ',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [5, 2],
        no1: [5, 1],
        prev: [4, 0],
        next: [5, 2],
      },
      {
        status1: 0,
        question1:
          '4.6.1-Q2: Provide narrative and justification of narrative as to why the labor categories are not correct.',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [5, 0],
        next: [5, 2],
      },
      {
        status1: 0,
        question1:
          '4.6.1.Q3: Do you agree that the hours are distributed between the labor categories adequately to do the work?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [6, 0],
        no1: [5, 3],
        prev: [5, 0],
        next: [6, 0],
      },
      {
        status1: 0,
        question1:
          '4.6.1-Q4: Provide narrative and justification of narrative to describe why the distribution of hours between labor categories are not correct.',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [5, 2],
        next: [6, 0],
      },
    ],
  },
  {
    type: 'Material',
    code: '4.7',
    title: 'Evaluate Material Costs on BOM/CBOM (Associated with WBS/Task)',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours. ',
        question1:
          '4.7.1-Q1: Do you agree that the number of hours proposed for the WBS/Task are needed to complete the work? Are more or less hours needed?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [7, 0],
        no1: [6, 1],
        prev: [5, 0],
        next: [7, 0],
      },
      {
        status1: 0,
        question1:
          '4.7.1-Q2: Provide narrative and justification of narrative as to why the number of hours is not correct.',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [6, 1],
        next: [7, 0],
      },
    ],
  },
  {
    type: 'Travel',
    code: '4.8',
    title: 'Evaluate Travel Proposal',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours.',
        question1:
          '4.8.1-Q1: Do you agree that the number of hours proposed for the WBS/Task are needed to complete the work? Are more or less hours needed?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [8, 0],
        no1: [7, 1],
        prev: [6, 0],
        next: [8, 0],
      },
      {
        status1: 0,
        question1:
          'Provide narrative and justification of narrative as to why the number of hours is not correct.',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [7, 0],
        next: [8, 0],
      },
    ],
  },
  {
    type: 'summary',
    code: '4.9',
    title: 'WBS Summary Review',
    children: [
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours. ',
        question1:
          '4.9.1-Q1: Do you agree with the number of hours for the WBS as shown below? (shows the original if recommended changes were provided, or the roll up of original and recommended number of hours)',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [8, 1],
        no1: [8, 1],
        prev: [7, 0],
        next: [8, 1],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.9.2-Q1: WBS Labor Categories: Do you agree that the WBS Level hours are distributed appropriately across time in alignment with how the work should be performed?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [8, 2],
        no1: [8, 3],
        prev: [8, 0],
        next: [8, 3],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.9.2-Q2: Provide narrative and justification of narrative as to why the distribution of hours is not correct.',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [8, 1],
        next: [8, 3],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1: '4.9.2-Q3: Would you like to provide recommended distribution of hours?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [8, 4],
        no1: [8, 5],
        prev: [8, 2],
        next: [8, 5],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1: '4.9.2-Q4: Provide distribution of hours within the POP table below:',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        prev: [8, 3],
        next: [8, 5],
      },
      {
        status1: 0, // 0 not start, 1: moveOptions 1, 2: moveOptions 2 ....
        question1:
          '4.9.3-Q1: WBS Labor Categories: Do you agree that all of the different labor categories are needed for the overall WBS task?',
        description1: 'SOW Language (SOW language specifically associated only with this WBS)',
        description3: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes1: [0, 0],
        no1: [0, 0],
        prev: [0, 0],
        next: [0, 0],
      },
    ],
  },
];
