// components/QueryProvider.tsx
"use client"

import React, { ReactNode } from "react"
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
} from "@tanstack/react-query"

type Props = {
  children: ReactNode
  dehydratedState?: unknown
}

const queryClient = new QueryClient()

export default function QueryProvider({ children, dehydratedState }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
    </QueryClientProvider>
  )
}
