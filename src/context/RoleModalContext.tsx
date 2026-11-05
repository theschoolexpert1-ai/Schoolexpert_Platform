import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import RoleSelectionModal from '@/components/RoleSelectionModal/RoleSelectionModal';

interface RoleModalContextValue {
  openRoleModal: () => void;
  closeRoleModal: () => void;
}

const RoleModalContext = createContext<RoleModalContextValue | null>(null);

/** One shared role-selection modal for every "Explore the Platform" button. */
export function RoleModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openRoleModal = useCallback(() => setOpen(true), []);
  const closeRoleModal = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ openRoleModal, closeRoleModal }), [openRoleModal, closeRoleModal]);

  return (
    <RoleModalContext.Provider value={value}>
      {children}
      <RoleSelectionModal open={open} onClose={closeRoleModal} />
    </RoleModalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRoleModal() {
  const ctx = useContext(RoleModalContext);
  if (!ctx) throw new Error('useRoleModal must be used inside <RoleModalProvider>');
  return ctx;
}
