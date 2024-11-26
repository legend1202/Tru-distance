import { Helmet } from 'react-helmet-async';

import { TeamLeadAssignView } from 'src/sections/approval_workflow/team_lead_assign/view';
// ----------------------------------------------------------------------

export default function TeamLeadAssignPage() {
  return (
    <>
      <Helmet>
        <title> Approval: Team Lead Assign</title>
      </Helmet>

      <TeamLeadAssignView />
    </>
  );
}
