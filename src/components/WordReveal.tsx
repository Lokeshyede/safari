import React from 'react'

interface WordRevealProps {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'p' | 'div'
  className?: string
  wordWrapperClassName?: string
  wordInnerClassName?: string
  id?: string
}

export default function WordReveal({
  text,
  as: Component = 'h2',
  className = '',
  wordWrapperClassName = '',
  wordInnerClassName = '',
  id,
}: WordRevealProps) {
  const words = text.split(/\s+/).filter(Boolean)

  return (
    <Component className={className} id={id} data-word-reveal="true">
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span
            className={`inline-block overflow-hidden align-top pb-[0.08em] ${wordWrapperClassName}`}
          >
            <span
              className={`word-inner inline-block will-change-transform ${wordInnerClassName}`}
            >
              {word}
            </span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </React.Fragment>
      ))}
    </Component>
  )
}
