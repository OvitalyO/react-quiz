import { Box, Button, Container, Title } from '@mantine/core'

const ErrorPage = () => {

  const reloadPage = () => {
    location.reload()
  }

  return (
    <Container>
      <Box>
        <Title>Произошла непредвиденная ошибка</Title>
        <Button onClick={reloadPage} variant='light'>Перезагрузить</Button>
      </Box>
    </Container>
  )
}

export default ErrorPage
