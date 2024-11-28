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
        number: '4.1.3-Q1',
        intro: ' Read the SOW section, WBS Descriptions and Task Descriptions below: ',
        question: 'Do you believe that the SOW section(s) encompass all of the CDRLs required?',
        description:
          'SOW Language (SOW language specifically associated only with this WBS) /n CDRLs are highlighted and bold and provide a link to each CDRL (Form 1423’s).  They open in PDFs in new page. ',
        yes: [0, 9],
        no: [0, 8],
      },
      {
        number: '4.1.3-Q2',
        question:
          'Provide missing CDRLs needed in the SOW in box below (narrative box Page 4.1.3-Q2.) ',
        description: 'Recommended CDRLs:',
        narrative: '',
        next: [0, 9],
      },
      {
        number: '4.1.4.Q1',
        intro: 'Read the SOW section, and WBS Description below: ',
        question:
          'Do you believe that the SOW section(s) encompass the work in the WBS, and that the WBS Descriptions address the requirements in the SOW?',
        description: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes: [0, 11],
        no: [0, 10],
      },
      {
        number: '4.1.4-Q2',
        question:
          'Provide narrative of how SOW doesn’t align with WBS Descriptions in box below (narrative box Section 1: Page 4.1.4-Q2.)',
        description: 'WBS Description',
        narrative: '',
        next: [0, 11],
      },
      {
        number: '4.1.4-Q3',
        intro: 'Read the SOW section, and WBS Description below: ',
        question: 'Do you recommend any modifications to the SOW (adds, deletes, re-words)?',
        description: 'SOW Language (SOW language specifically associated only with this WBS)',
        yes: [0, 12],
        no: [1, 0],
      },
      {
        number: '4.1.4-Q4',
        question:
          'Redline the SOW in the section below: (Section shows redlines, but has button options to show all mark-up, simple mark-up and no mark-up. (Data is captured in database)',
        description: 'WBS Description',
        narrative: '',
        next: [1, 0],
      },
    ],
  },
  {
    type: 'Methodology',
    code: '4.2',
    description: 'Evaluate Methodology:',
    children: [
      {
        number: '4.2.1-Q1',
        intro:
          'Let’s look at the methodology of your first Task for this WBS. WBS (X.Y.Z) (Display the WBS number and Task #) Please read the Methodology section below: (Display the Methodology from the first WBS and first Task)',
        question:
          'What type of Methodology approach was used: (Provide a small help link next to each answer or make the answer a link that provides a pop-up description of each methodology) Get descriptions from DAU.',
        options: [
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
            next: [1, 4],
          },
          {
            title: 'Engineering Judgment Methodology',
            next: [1, 5],
          },
        ],
      },
      {
        number: '4.2.1.a-Q1',
        question:
          'Analogous Methodology: Do you believe that the justification provided as part of the Methodology uses actuals with similar work to the work in the WBS/Task? ',
        options: [
          '(a)Not at all: 0%',
          'Low Similarity: 1-25%',
          'Low-Medium Similarity: 26-50%',
          '(d)Medium Similarity: 51-70%',
          'Medium-High Similarity: 71-90%',
          'High Similarity: 90-100%',
        ],
        question2:
          'Provide what level of similarity you believe that the provided actual work is to the WBS/Task work: Provide Justification for Analogous methodology level of similarity determination',
        next: [1, 10],
      },
      {
        number: '4.2.1.b.Q1',
        question:
          'Cost Estimating Relationship (CER): Do you believe that the justification provided as part of the Methodology uses actuals with similar work to the work in the WBS/Task? ',
        options: [
          '(a)Not at all: 0%',
          'Low Similarity: 1-25%',
          'Low-Medium Similarity: 26-50%',
          '(d)Medium Similarity: 51-70%',
          'Medium-High Similarity: 71-90%',
          'High Similarity: 90-100%',
        ],
        question2:
          'Provide what level of similarity you believe that the provided actual work is to the WBS/Task work: Provide Justification for Analogous methodology level of similarity determination',
        next: [1, 10],
      },
      {
        number: '4.2.1.c-Q1',
        question:
          'Task Based or Bottoms Up Methodology: Are the tasks listed an accurate representation of the work needed to accomplish the description?',
        yes: [1, 5],
        no: [1, 4],
      },
      {
        number: '4.2.1.c-Q2',
        question:
          'Provide narrative of why the Tasks listed are not an accurate resprentation of the work needed to accomplish the description. (narrative box Section 1: Page 4-4.2.1.c-Q2.)  (Answer data is collected and move to 2.1.c.Q3)',
        narrative: '',
        next: [1, 5],
      },
      {
        number: '4.2.1.c-Q3',
        question:
          'Task Based or Bottoms Up Methodology: Do the task hours seem reasonable for the work?',
        yes: [1, 10],
        no: [1, 10],
      },
      {
        number: '4.2.1.d-Q1',
        question:
          'Is the work related to support type of work vs specific product delivery efforts?',
        yes: [1, 7],
        no: [1, 7],
      },
      {
        number: '4.2.1.d-Q2',
        question: 'Does the work described in the SOW align with level of effort work activities? ',
        yes: [1, 10],
        no: [1, 10],
      },
      {
        number: '4.2.1.e-Q1',
        question: 'Was the justification provided understandable and logical? ',
        yes: [1, 9],
        no: [1, 9],
      },
      {
        number: '4.2.1.e-Q2',
        question:
          'Does the subject matter expert’s experience level aligned with the type of work and the provided justification? ',
        yes: [1, 10],
        no: [1, 10],
      },
      {
        number: '4.2.2-Q1',
        intro: 'Let’s look at other factors included as part of the methodology calculations:',
        question1:
          'Complexity, Risk and Learning Curve: Is a complexity factor contained within the methodology calculations? Is a Risk Factor contained within the methodology calculations? Is a learning curve factor contained within the methodology calculations? Input complexity, Risk and Learning curve factors below (enter “N/A” if not included) (if nothing entered in box, software will assume it is N/A and will enter value of 1 for each of these)',
        question2:
          ' Provide justification in the Narration/Justification input area below for concurrence or non-concurrence ',
        next: [1, 11],
      },
      {
        number: '4.2.3-Q1',
        question1: '',
        question2: 'Do you agree with the overall Methodology Summary and your Narratives? ',
        yes: [2, 0],
        no: [1, 10],
      },
    ],
  },
];
