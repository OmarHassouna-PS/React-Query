import {
  useQuery,
  useMutation,
  useQueryClient,
} from 'react-query'
import { Inter } from 'next/font/google'
import Link from 'next/link'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >

      <Link href="useQuery">
        useQuery
      </Link>
      <Link href="useMutation">
        useMutation
      </Link>
      <Link href="useQueryClient">
        useQueryClient
      </Link>
      <Link href="useInfiniteQuery">
        useInfiniteQuery
      </Link>
      <Link href="useQueryErrorResetBoundary">
        useQueryErrorResetBoundary
      </Link>
      <Link href="usePaginatedQuery">
        usePaginatedQuery
      </Link>
      <Link href="useMutationUpdate">
        useMutationUpdate
      </Link>
    </main>
  )
}


