import { Box, CssBaseline } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import MenuContext, { pageArray } from '../../context/menu-context';
import { auth, getNotes } from '../../firebase';
import Dashboard from './Dashboard';
import Header from './Header';
import SideDrawer from './SideDrawer';

const Layout = () => {
  const [open, setOpen] = useState(false);

  const [notes, setNotes] = useState([]);
  const [dataAdded, setDataAdded] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const [showAddNote, setShowAddNote] = useState(true);

  const [fetchNotes, setFetchNotes] = useState(false);
  const [fetchArchived, setFetchArchived] = useState(false);
  const [fetchTrashed, setFetchTrashed] = useState(false);

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    fetchDataFromFireStore('isNote');
  };

  const handleGetNotes = () => {
    setShowAddNote(true);
    setShowDeleteAll(false);
    setFetchNotes(true);
    setFetchArchived(false);
    setFetchTrashed(false);
    setNotes([]);
    fetchDataFromFireStore('isNote');
  };

  const handleGetArchived = () => {
    setShowAddNote(false);
    setShowDeleteAll(false);
    setFetchNotes(false);
    setFetchArchived(true);
    setFetchTrashed(false);
    setNotes([]);
    fetchDataFromFireStore('isArchived');
  };

  const handleGetTrashed = () => {
    setShowAddNote(false);
    setShowDeleteAll(true);
    setFetchNotes(false);
    setFetchArchived(false);
    setFetchTrashed(true);
    setNotes([]);
    fetchDataFromFireStore('isTrashed');
  };

  const fetchDataFromFireStore = useCallback(
    async (queryClause) => {
      const receivedNotesSnapShot = await getNotes(user?.uid, queryClause);
      const receivedNotes = [];
      receivedNotesSnapShot.forEach((d) => {
        const doc = d.data();
        receivedNotes.push({
          id: d.id,
          title: doc.title,
          note: doc.note,
          date: new Date(doc.date.toDate()),
          isNote: doc.isNote,
          isArchived: doc.isArchived,
          isTrashed: doc.isTrashed,
          lastEdited: new Date(doc.lastEdited.toDate()),
        });
      });

      receivedNotes.sort((a, b) => b.lastEdited - a.lastEdited);
      setNotes(receivedNotes);
      setDataAdded(false);
    },
    [user?.uid]
  );

  const handleOnClickLocation = () => {
    if (fetchNotes) fetchDataFromFireStore('isNote');
    if (fetchTrashed) fetchDataFromFireStore('isTrashed');
    if (fetchArchived) fetchDataFromFireStore('isArchived');
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate('/');
    fetchDataFromFireStore('isNote');
  }, [fetchDataFromFireStore, loading, navigate, user]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MenuContext.Provider
        value={{
          open: open,
          handleDrawerOpen: handleDrawerOpen,
          handleDrawerClose: handleDrawerClose,
        }}
      >
        <Header />
        <SideDrawer
          getNotes={handleGetNotes}
          getArchived={handleGetArchived}
          getTrashed={handleGetTrashed}
        />
        <Dashboard
          onAdd={handleAdd}
          onClickLocation={handleOnClickLocation}
          notes={notes}
          showAddNote={showAddNote}
          showDeleteAll={showDeleteAll}
          uid={user?.uid}
          getTrashed={handleGetTrashed}
        />
      </MenuContext.Provider>
    </Box>
  );
};

export default Layout;
