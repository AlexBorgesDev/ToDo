import { memo, useState } from 'react'
import { FaCaretDown, FaSignOutAlt } from 'react-icons/fa'

import { LogoTitle } from '../LogoTitle'
import { useAuth } from '../../hooks/useAuth'

import {
  Container,
  Nav,
  UserButton,
  UserButtonIcon,
  UserDropdownContainer,
  UserDropdownItem,
  UserDropdownItemIcon,
} from './styles'

export const Navbar = memo(function Navbar() {
  const { user, signOut } = useAuth()

  const [isVisibleUserDropdown, setIsVisibleUserDropdown] = useState(false)

  return (
    <Container>
      <Nav>
        <LogoTitle />

        <UserButton
          data-testid="navUserButton"
          onClick={() => setIsVisibleUserDropdown(!isVisibleUserDropdown)}
        >
          {user?.name.split(' ')[0]}
          <UserButtonIcon>
            <FaCaretDown />
          </UserButtonIcon>
        </UserButton>

        {isVisibleUserDropdown && (
          <UserDropdownContainer data-testid="navUserDropdown">
            <UserDropdownItem isLogOut onClick={signOut}>
              Log Out
              <UserDropdownItemIcon>
                <FaSignOutAlt />
              </UserDropdownItemIcon>
            </UserDropdownItem>
          </UserDropdownContainer>
        )}
      </Nav>
    </Container>
  )
})
