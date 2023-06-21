import { useHotkeys } from '@mantine/hooks'
import { memo } from 'react'
import {
  ActionIcon,
  Header as MHeader, createStyles, Group,
  useMantineColorScheme, Container, Text,
} from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons-react'

export const Header = memo(() => {
  const { classes } = useStyles()

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  const isDark = colorScheme === 'dark'

  const toggleTheme = () => {
    toggleColorScheme()
  }

  useHotkeys([['mod+J', toggleTheme]])

  return (
    <MHeader height={60} mb={120}>
      <Container className={classes.header}>
        <Group>
          <ActionIcon
            variant="outline"
            color={isDark ? 'yellow' : 'blue'}
            onClick={toggleTheme}
            title="Toggle color scheme"
          >
            {
              isDark
                ? <IconSun size="1.1rem" />
                : <IconMoonStars size="1.1rem" />
            }
          </ActionIcon>
          <Text>(mod+J)</Text>
        </Group>
      </Container>
    </MHeader>
  )
})

const useStyles = createStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%'
  }
}))
