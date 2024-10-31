import { Helmet } from 'react-helmet-async';

import { UsersListView } from 'src/sections/admin/userslist/view';
// ----------------------------------------------------------------------

export default function EvalProgressPage() {
  return (
    <>
      <Helmet>
        <title> Admin: Users List</title>
      </Helmet>

      <UsersListView />
    </>
  );
}
