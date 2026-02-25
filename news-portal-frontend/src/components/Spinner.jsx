const Spinner = ({ size = 'md' }) => {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-16 h-16' }
  return (
    <div className="flex justify-center items-center py-10">
      <div className={`${sizes[size]} border-2 border-muted border-t-primary rounded-full animate-spin`} />
    </div>
  )
}

export default Spinner
