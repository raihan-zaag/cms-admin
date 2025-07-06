import React from 'react'

interface RenderNodeProps {
  render: React.ReactElement
}

export function RenderNode({ render }: RenderNodeProps) {
  return (
    <div className="relative">
      {render}
    </div>
  )
} 