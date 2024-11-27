export const flowData = [
  // 4.1.1
  {
    type: 'scope',
    code: '4.1',
    description: 'Scope Section',
    children: [
      {
        type: 'scope',
        code: '4.1.1',
        description: 'SOW accuracy Sub Section',
        children: [
          {
            type: 'scope',
            code: '4.1.1.a',
            description: 'Read the SOW section below: ',
            children: [
              {
                type: 'scope', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.1.1.a-Q1',
                question: 'Is the SOW language complete, and correct?',
                description:
                  'SOW Language (SOW language specifically associated only with this WBS)',
                option: ['4.1.2', ' 4.1.1-Q3'],
              },
              {
                type: 'scope', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.1.1.a-Q2',
                question:
                  '4.1.1.a-Q2: Is the SOW language concise enough to provide the government the ability to determine if the contractor is not doing the job satisfactorily?',
                description:
                  'SOW Language (SOW language specifically associated only with this WBS)',
                option: ['4.1.2', '4.1.1-Q3'],
              },
            ],
          },
          {
            type: 'scope',
            code: '4.1.1.b',
            question: 'Redline the SOW in the section below',
            description: 'SOW Language (SOW language specifically associated only with this WBS)',
          },
        ],
      },
      {
        type: 'scope',
        code: '4.1.2',
        description: 'Read the SOW section, and Assumptions section below: ',
        children: [
          {
            type: 'scope',
            code: '4.1.2.a',
            description: 'Read the SOW section below:',
            children: [
              {
                type: 'scope', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.1.2-Q1',
                question: 'Do you believe that the SOW section(s) encompass the assumptions?',
                description:
                  'SOW Language (SOW language specifically associated only with this WBS)',
                option: ['4.1.2-Q3', '4.1.2-Q2'],
              },
              {
                type: 'scope', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.1.2-Q2',
                question:
                  'Provide narrative of how SOW doesn’t align with assumptions in box below (narrative box Section 1: Page 4.1.2-Q2.)',
                description: 'Assumptions',
                narrative: 'Narrative: 4.1.2-Q2',
              },
            ],
          },
          {
            type: 'scope',
            code: '4.1.2.b',
            description: 'Read the SOW section, and Assumptions section below:',
            children: [
              {
                type: 'scope', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.1.2-Q3',
                question:
                  'Do you recommend any modifications to the SOW (adds, deletes, re-words)?',
                description:
                  'SOW Language (SOW language specifically associated only with this WBS)',
                option: ['4.1.2-Q4', 'Page 4.1.3)'],
              },
              {
                type: 'scope', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.1.2-Q4',
                question:
                  'Provide narrative of how SOW doesn’t align with assumptions in box below (narrative box Section 1: Page 4.1.2-Q2.)',
                description:
                  'Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
                option: ['4.1.2-Q4', 'Page 4.1.3)'],
                narrative: 'Narrative: Page 4.1.2-Q4',
              },
            ],
          },
        ],
      },
      {
        type: 'scope',
        code: '4.1.3',
        description: 'Read the SOW section, WBS Descriptions and Task Descriptions below: ',
        children: [
          {
            type: 'scope',
            code: '4.1.3-Q1',
            question: 'Do you believe that the SOW section(s) encompass all of the CDRLs required?',
            description:
              'SOW Language (SOW language specifically associated only with this WBS). \n CDRLs are highlighted and bold and provide a link to each CDRL (Form 1423’s).  They open in PDFs in new page',
            option: ['4.1.4', '4.1.3-Q2'],
          },
          {
            type: 'scope',
            code: '4.1.3-Q2',
            question:
              'Provide missing CDRLs needed in the SOW in box below (narrative box Page 4.1.3-Q2.)',
            description: 'Recommended CDRLs:',
            narrative:
              'Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
          },
        ],
      },
      {
        type: 'scope',
        code: '4.1.4',
        description: 'Read the SOW section, and WBS Description below: ',
        children: [
          {
            type: 'scope',
            code: '4.1.4.a',
            description: 'Read the SOW section, and WBS Description below: ',
            children: [
              {
                type: 'scope',
                code: '4.1.4.Q1',
                question:
                  'Do you believe that the SOW section(s) encompass the work in the WBS, and that the WBS Descriptions address the requirements in the SOW?',
                description:
                  'SOW Language (SOW language specifically associated only with this WBS)',
                option: ['4.1.4-Q3', '4.1.4-Q2'],
              },
              {
                type: 'scope',
                code: '4.1.4.Q2',
                question:
                  'Provide narrative of how SOW doesn’t align with WBS Descriptions in box below (narrative box Section 1: Page 4.1.4-Q2.)',
                description: 'WBS Description',
                narrative: '4.1.4-Q2',
              },
            ],
          },
          {
            type: 'scope',
            code: '4.1.4.b',
            description: 'Read the SOW section, and WBS Description below: ',
            children: [
              {
                type: 'scope',
                code: '4.1.4.Q3',
                question:
                  'Do you recommend any modifications to the SOW (adds, deletes, re-words)?',
                description:
                  'SOW Language (SOW language specifically associated only with this WBS)',
                option: ['4.1.4-Q4', '4.2.1'],
              },
              {
                type: 'scope',
                code: '4.1.4.Q4',
                question:
                  '(2) Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
                description: 'WBS Description',
                narrative: '1.4.Q4 Redline SOW',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    type: 'methodology',
    code: '4.2',
    description: 'Evaluate Methodology',
    children: [
      {
        type: 'methodology',
        code: '4.2.1',
        description: 'Methodology Determination',
        intro:
          'Let’s look at the methodology of your first Task for this WBS. WBS (X.Y.Z) (Display the WBS number and Task #) Please read the Methodology section below: (Display the Methodology from the first WBS and first Task)',
        question: 'What type of Methodology approach was used: ',
        options: [
          {
            type: 'methodology', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
            // code: '4.1.1.a-Q1',
            title: 'Analogous Methodology (Historical actuals)',
            moveTo: '4.2.1.a-Q1',
          },
          {
            type: 'methodology', // method, quntity, distribution, laboruse, laborspread, material,
            title: 'Cost Estimating Relationship (CER) Methodology',
            moveTo: '4.2.1.b-Q1',
          },
          {
            type: 'methodology', // method, quntity, distribution, laboruse, laborspread, material,
            title: 'Task Based or Bottoms Up Methodology',
            moveTo: '4.2.1.c-Q1',
          },
          {
            type: 'methodology', // method, quntity, distribution, laboruse, laborspread, material,
            title: 'Level of Effort (LOE) Methodology',
            moveTo: '4.2.1.d-Q1',
          },
          {
            type: 'methodology', // method, quntity, distribution, laboruse, laborspread, material,
            title: 'Engineering Judgment Methodology',
            moveTo: '4.2.1.e-Q1',
          },
        ],

        children: [
          {
            type: 'methodology',
            code: '4.2.1.a',
            title: 'Analogous Methodology',
            questions: [
              {
                type: 'methodology',
                code: '4.2.1.a-Q1',
                question:
                  'Do you believe that the justification provided as part of the Methodology uses actuals with similar work to the work in the WBS/Task? ',
                option: [
                  'Not at all: 0%',
                  'Low Similarity: 1-25%',
                  'Low-Medium Similarity: 26-50%',
                  'Medium Similarity: 51-70%',
                  'Medium-High Similarity: 71-90%',
                  'High Similarity: 90-100%',
                ],
              },
              {
                type: 'methodology', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.2.1.a-Q2',
                question:
                  'Provide what level of similarity you believe that the provided actual work is to the WBS/Task work: Provide Justification for Analogous methodology level of similarity determination',
              },
            ],
          },
          {
            type: 'methodology',
            code: '4.2.1.b',
            title: 'Cost Estimating Relationship (CER)',
            questions: [
              {
                type: 'methodology',
                code: '4.2.1.b-Q1',
                question:
                  'Do you believe that the justification provided as part of the Methodology uses actuals with similar work to the work in the WBS/Task? ',
                option: [
                  'Not at all: 0%',
                  'Low Similarity: 1-25%',
                  'Low-Medium Similarity: 26-50%',
                  'Medium Similarity: 51-70%',
                  'Medium-High Similarity: 71-90%',
                  'High Similarity: 90-100%',
                ],
              },
              {
                type: 'methodology', // method, quntity, distribution, laboruse, laborspread, material,travel, govt
                code: '4.2.1.b-Q2',
                question:
                  'Provide what level of similarity you believe that the provided actual work is to the WBS/Task work: Provide Justification for Analogous methodology level of similarity determination',
              },
            ],
          },
          {
            type: 'methodology',
            code: '4.2.1.c',
            title: 'Task Based or Bottoms Up Methodology',
            children: [
              {
                type: 'methodology',
                code: '4.2.1.c-Q1',
                question:
                  'Are the tasks listed an accurate representation of the work needed to accomplish the description? ',
                description:
                  'Task / Bottoms Up Estimating Definition: \n Definition of Task/Bottoms up Estimating',
                option: ['4.2.1.c-Q3', '4.2.1.c-Q2'],
              },
              {
                type: 'methodology',
                code: '4.2.1.c-Q2',
                question:
                  'Provide narrative of why the Tasks listed are not an accurate resprentation of the work needed to accomplish the description. (narrative box Section 1: Page 4-4.2.1.c-Q2.)  (Answer data is collected and move to 2.1.c.Q3)',
                description:
                  'Task / Bottoms Up Estimating Definition: \n Definition of Task/Bottoms up Estimating',
                narrative: '4-4.2.1.c-Q2',
              },
              {
                type: 'methodology',
                code: '4.2.1.c-Q3',
                question: 'Do the task hours seem reasonable for the work?',
                option: ['4.2.1-Q7', '4.2.1-Q7'],
              },
            ],
          },
          {
            type: 'methodology',
            code: '4.2.1.d',
            title: 'Level of Effort (LOE) Methodology',
            children: [
              {
                type: 'methodology',
                code: '4.2.1.d-Q1',
                question:
                  'Is the work related to support type of work vs specific product delivery efforts? ',
                description: 'Level of Effort Definition: ',
              },
              {
                type: 'methodology',
                code: '4.2.1.d-Q2',
                question:
                  'Does the work described in the SOW align with level of effort work activities? ',
                description: 'Please provide Justification for your response below; ',
              },
            ],
          },
          {
            type: 'methodology',
            code: '4.2.1.e',
            title: 'Engineering Judgement',
            children: [
              {
                type: 'methodology',
                code: '4.2.1.e-Q1',
                question: 'Was the justification provided understandable and logical?',
                description: 'Please provide Justification for your response to the right/below',
              },
              {
                type: 'methodology',
                code: '4.2.1.e-Q2',
                question:
                  'Does the subject matter expert’s experience level aligned with the type of work and the provided justification? ',
                description: 'Please provide Justification for your response below',
              },
            ],
          },
        ],
      },
      {
        type: 'methodology',
        code: '4.2.2',
        description: 'Concurrence/Non-Concurrence with methodology',
        intro: ' Let’s look at other factors included as part of the methodology calculations:',
        children: [
          {
            type: 'methodology',
            code: '4.2.2-Q1',
            question:
              'Complexity, Risk and Learning Curve: Is a complexity factor contained within the methodology calculations? Is a Risk Factor contained within the methodology calculations? Is a learning curve factor contained within the methodology calculations? Input complexity, Risk and Learning curve factors below (enter “N/A” if not included) (if nothing entered in box, software will assume it is N/A and will enter value of 1 for each of these)',
            option: [
              {
                factor: 'Complexity Factor',
                value: 1,
                concur: 1,
                nonconcur: 1,
              },
              {
                factor: 'Risk Factor',
                value: 1,
                concur: 1,
                nonconcur: 1,
              },
              {
                factor: 'Learning Curve Factor',
                value: 1,
                concur: 1,
                nonconcur: 1,
              },
            ],
          },
          {
            type: 'methodology',
            code: '4.2.2-Q2',
            question:
              'Provide justification in the Narration/Justification input area below for concurrence or non-concurrence',
            option: [
              {
                question: 'Complexity Factor Justification: (Q2.1)',
                justification: '',
              },
              {
                question: 'Risk Factor Justification: (Q2.2)',
                justification: '',
              },
              {
                question: 'Learning Curve Factor Justification: (Q2.3)',
                justification: '',
              },
            ],
          },
        ],
      },

      {
        type: 'methodology',
        code: '4.2.3',
        description: 'Methodology Summary',
        intro: 'Let’s look at Methodology summary for this Task(X.Y.Z) (Display the Task #) ',
        children: [
          {
            type: 'methodology',
            code: '4.2.3-Q1',
            question: 'Do you agree with the overall Methodology Summary and your Narratives? ',
            moveTo: ['4.3.1', '4.2.2'],
          },
          {
            type: 'methodology',
            code: '4.2.3-Q2',
            question:
              'Review the Narratives below and select whether you are in agreement with the verbiage.',
          },
        ],
      },
    ],
  },
  {
    type: 'quantity',
    code: '4.3',
    description: 'Evaluate Quantity of Hours using methodology',
    children: [
      {
        type: 'quantity',
        code: '4.3.1',
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours. ',
        question: 'What type of Methodology approach was used: ',
        children: [
          {
            type: 'quantity',
            code: '4.3.1-Q1',
            question:
              'Do you agree that the number of hours proposed for the Task are needed to complete the work? ',
            moveTo: ['4.3.1-Q3', ' 4.3.1-Q2)'],
          },
          {
            type: 'quantity',
            code: '4.3.1-Q2',
            question: 'Are more or less hours needed? ',
            moveTo: ['4.3.1-Q3', ' 4.3.1-Q3'],
          },
          {
            type: 'quantity',
            code: '4.3.1-Q3',
            question:
              'In the narrative boxes below, input the recommended # of hours and provide narrative and justification of narrative as to why the estimated number of hours is accurate or inaccurate for the Task. ',
            narrative: 'BOE Hours',
          },
          {
            type: 'quantity',
            code: '4.3.1-Q4',
            question:
              'Does the number of hours on this task overlap with other tasks (ie.. Are they charging for similar work across multiple Tasks or WBSs?) (Software would do an analysis on this and provide)',
            moveTo: ['4.3.1-Q5', ' 4.4'],
          },
          {
            type: 'quantity',
            code: '4.3.1-Q5',
            question:
              'In the narrative box below, please provide narrative and justification of narrative as to where you believe there is overlap of hours within tasks of the WBS.',
            narrative: 'Narrative / Justification',
          },
        ],
      },
    ],
  },
  {
    type: 'pop',
    code: '4.4',
    description:
      'Evaluate Distribution of Proposed Hours across provided period of performance (POP)',
    children: [
      {
        type: 'pop',
        code: '4.4.1',
        intro: 'Let’s look at how the hours are planned across the period of performance',
        children: [
          {
            type: 'pop',
            code: '4.4.1-Q1',
            question:
              'Task Labor Categories: Do you agree that the Task Level hours are distributed appropriately across time in alignment with how the work should be performed?',
            moveTo: ['4.5.1-Q5', '4.4.1-Q2'],
          },
          {
            type: 'pop',
            code: '4.4.1-Q2',
            question:
              'Provide narrative and justification of narrative as to why the distribution of hours is not correct.',
            narrative: 'Page 4.4.1-Q2',
          },
          {
            type: 'pop',
            code: '4.4.1-Q3',
            question: 'Would you like to provide recommended distribution of hours?',
            moveTo: ['4.4.1-Q4', '4.5.1-Q1'],
          },
          {
            type: 'pop',
            code: '4.4.1-Q4',
            question:
              'Provide distribution of hours within the Period of Performance (POP) table Pop-up:',
            narrative: '',
          },
        ],
      },
    ],
  },
  {
    type: 'labor',
    code: '4.5',
    description: 'Evaluate Labor Categorie',
    children: [
      {
        type: 'labor',
        code: '4.5.1',
        intro:
          'Let’s look at the skillset of the proposed Labor Categories and determine if those are adequate for the work. (Show Task labor categories with links to pop-up of description of each)',
        children: [
          {
            type: 'labor',
            code: '4.5.1-Q1',
            question:
              'Task Labor Categories: Do you agree that all of the different labor categories are needed for the overall WBS task?',
            moveTo: ['4.5.1-Q3', '4.5.1-Q2', '4.5.1-Q2', ''],
          },
          {
            type: 'labor',
            code: '4.5.1-Q2',
            question:
              'WBS Labor Categories: Do you agree that all of the different labor categories are needed for the overall WBS task?',
          },
        ],
      },
    ],
  },
  {
    type: 'labordistribution',
    code: '4.6',
    description: 'Evaluate Labor Categories Distribution of work',
    children: [
      {
        type: 'labordistribution',
        code: '4.6.1',
        intro: 'Intro: Next, let’s look at the labor categories for the work on this task',
        children: [
          {
            type: 'labordistribution',
            code: '4.6.1-Q1',
            question:
              'Do you agree that the labor categories are the correct type of skillsets to complete the work?',
            moveTo: ['4.6.1-Q1', '4.6.1-Q2'],
          },
          {
            type: 'labordistribution',
            code: '4.6.1-Q2',
            question:
              'Provide narrative and justification of narrative as to why the labor categories are not correct.',
            narrative: 'narrative',
          },
          {
            type: 'labordistribution',
            code: '4.6.1-Q3',
            question:
              'Do you agree that the hours are distributed between the labor categories adequately to do the work? (ie.. Are there too many hours for senior level labor categories or junior level categories?) ',
            moveTo: ['4.6.1-Q3', '4.6.1-Q4'],
          },
          {
            type: 'labordistribution',
            code: '4.6.1-Q4',
            question:
              'Provide narrative and justification of narrative to describe why the distribution of hours between labor categories are not correct.',
            narrative: 'narrative',
          },
        ],
      },
    ],
  },
  {
    type: 'material',
    code: '4.7',
    description: '4)Evaluate Material Costs on BOM/CBOM (Associated with WBS/Task)',
    children: [
      {
        type: 'material',
        code: '4.7.1',
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours. ',
        children: [
          {
            type: 'material',
            code: '4.7.1-Q1',
            question:
              'Do you agree that the number of hours proposed for the WBS/Task are needed to complete the work? Are more or less hours needed?',
            moveTo: ['4.7.1-Q3', '4.7.1-Q2'],
          },
          {
            type: 'material',
            code: '4.7.1-Q2',
            question:
              '(2)Provide narrative and justification of narrative as to why the number of hours is not correct.',
            narrative: 'hhh',
          },
        ],
      },
    ],
  },
  {
    type: 'travel',
    code: '4.8',
    description: ' Evaluate Travel Proposal',
    children: [
      {
        type: 'travel',
        code: '4.8.1',
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours. ',
        children: [
          {
            type: 'travel',
            code: '4.8.1-Q1',
            question:
              '(1)Do you agree that the number of hours proposed for the WBS/Task are needed to complete the work? Are more or less hours needed?',
            moveTo: ['4.8.1-Q3', '4.8.1-Q2'],
          },
          {
            type: 'travel',
            code: '4.8.1-Q2',
            question:
              '(2) Provide narrative and justification of narrative as to why the number of hours is not correct.',
            narrative: '',
          },
        ],
      },
    ],
  },
  {
    type: 'wbs',
    code: '4.9',
    description: 'WBS Summary Review',
    children: [
      {
        type: 'wbs',
        code: '4.9.1',
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours. ',
        title: 'QUANTITY OF HOURS',
        children: [
          {
            type: 'wbs',
            code: '4.9.1-Q1',
            question:
              '(1)Do you agree with the number of hours for the WBS as shown below? (shows the original if recommended changes were provided, or the roll up of original and recommended number of hours)',
            moveTo: ['4.3.1-Q3', '4.3.1-Q2'],
          },
        ],
      },
      {
        type: 'wbs',
        code: '4.9.2',
        intro:
          'Let’s look at the number of hours for each task and the methodology for those hours. ',
        title: 'LABOR HOUR DISTRIBUTION',
        children: [
          {
            type: 'wbs',
            code: '4.9.2-Q1',
            question:
              'WBS Labor Categories: Do you agree that the WBS Level hours are distributed appropriately across time in alignment with how the work should be performed? ',
            moveTo: ['4.5.1-Q1', '4.9.2-Q2'],
          },
          {
            type: 'wbs',
            code: '4.9.2-Q2',
            question:
              'Provide narrative and justification of narrative as to why the distribution of hours is not correct.',
            narrative: '',
          },
          {
            type: 'wbs',
            code: '4.9.2-Q3',
            question: 'Would you like to provide recommended distribution of hours?',
            moveTo: ['4.9.2-Q4', '4.5.1-Q1'],
          },
          {
            type: 'wbs',
            code: '4.9.2-Q4',
            question: 'Provide distribution of hours within the POP table below:',
            narrative: '',
          },
        ],
      },
      {
        type: 'wbs',
        code: '4.9.3',
        intro:
          'Intro: Let’s look at the number of hours for each task and the methodology for those hours.',
        title: 'LABOR CATEGORIES',
        children: [
          {
            type: 'wbs',
            code: '4.9.3-Q1',
            question:
              'WBS Labor Categories: Do you agree that all of the different labor categories are needed for the overall WBS task? ',
            moveTo: ['4.9.3.Q3', '4.9.3.Q2', '4.9.3.Q2'],
          },
        ],
      },
    ],
  },
];
