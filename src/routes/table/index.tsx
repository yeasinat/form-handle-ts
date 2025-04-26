import { createFileRoute } from '@tanstack/react-router'
import UserTable from '../../components/UserTable'

export const Route = createFileRoute('/table/')({
  component: UserTable,
})

