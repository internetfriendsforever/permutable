import React from 'react'
import Mixer from './components/Mixer'

export default {
  '/': () => ({
    title: 'Mixer',
    component: (
      <Mixer />
    )
  }),

  'NotFound': () => ({
    status: 404,
    title: 'Page not found',
    component: 'Page not found'
  })
}
