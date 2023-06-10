import React from 'react'

type SourceBlockProperties = {
  title: string
  children: React.ReactNode
}

export function SourceBlock({ title, children }: SourceBlockProperties) {
  return (
    <React.Fragment>
      <p className="font-semibold leading-7">{title}</p>
      <pre className="max-h-52 scroll-m-20 overflow-auto rounded-md bg-muted p-2 font-mono text-sm">
        {children}
      </pre>
    </React.Fragment>
  )
}
