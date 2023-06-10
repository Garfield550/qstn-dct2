type InfoLineProperties = {
  title: string
  children: React.ReactNode
}

export function InfoLine({ title: name, children }: InfoLineProperties) {
  return (
    <p className="inline-flex items-center truncate leading-7">
      <span className="mr-2 font-semibold">{name}</span>
      <span>{children}</span>
    </p>
  )
}
