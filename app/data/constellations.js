const constellations = [
  {
    name: 'Can Mayor',
    id: 'canmayor',
    description: 'Constellation of imaging tools',
    rol: 'Images',
    stars: [
      {
        name: 'Sirius',
        description: 'Image resizer',
        largeDescription: 'The brightest star in the night sky, known for its blue-white color.',
        id: 'sirius',
        url: 'image-resizer',
        color: '#abd3ff',
        shadow: '#fff',
        width: '8rem',
        position: { top: '10%', left: '25%' }
      },
      {
        name: 'VY Canis Majoris',
        description: 'Image cropper',
        largeDescription: 'A massive red hypergiant star, one of the largest known stars in the universe.',
        id: 'vycanismajoris',
        url: 'image-cropper',
        color: '#9C5A1C',
        shadow: '#C50000',
        width: '12rem',
        position: { top: '3%', left: '60%' }
      },
      {
        name: 'Adhara',
        description: 'Image compressor',
        largeDescription: "Blue supergiant star. It's a reliable tool that shines like the star it's named after.",
        id: 'adhara',
        url: 'image-compressor',
        color: '#8BA5E9',
        shadow: '#3A69C6',
        width: '5rem',
        position: { top: '0%', left: '40%' }
      }
    ]
  },
  {
    name: 'Andromeda',
    id: 'andromeda',
    description: 'Constellation of tools for creators',
    rol: 'Creators',
    stars: [
      {
        name: 'Mirach',
        description: 'Background Remover',
        largeDescription: 'Mirach the red giant with a cutting edge.',
        id: 'mirach',
        url: 'background-remover',
        color: '#a83b0f',
        shadow: '#a35b34',
        width: '10rem',
        position: { top: '50%', left: '15%' }
      },
      {
        name: 'Alpheratz',
        description: 'Profile picture creator',
        largeDescription: 'Alpheratz, also known as Sirrah, is a binary star system.',
        id: 'alpheratz',
        url: 'profile-picture',
        color: '#abf',
        shadow: '#54A9FA',
        width: '9rem',
        position: { top: '-10%', left: '35%' }
      },
      {
        name: 'Almach',
        description: 'Convert PDF to JPG',
        largeDescription: "Almach's radiance travels over 350 light years to dazzle our eyes on Earth.",
        id: 'almach',
        url: 'pdf-to-jpg',
        color: '#5a2204',
        shadow: '#2e0b0b',
        width: '8rem',
        position: { top: '0%', left: '55%' }
      }
    ]
  },
  {
    name: 'Pegasus',
    id: 'pegasus',
    description: 'Constellation of video tools',
    rol: 'Videos',
    stars: [
      {
        name: 'Enif',
        description: 'Video cropper',
        largeDescription: 'Coming soon',
        id: 'enif',
        url: 'video-cropper',
        color: '#b57847',
        shadow: '#b8580b',
        width: '8rem',
        position: { top: '50%', left: '75%' },
        disable: true
      },
      {
        name: 'Scheat',
        description: 'Video Transcriptor',
        largeDescription: 'Coming soon',
        id: 'scheat',
        url: 'video-transcriptor',
        color: '#593c1e',
        shadow: '#300b23',
        width: '10rem',
        position: { top: '-10%', left: '20%' },
        disable: true
      },
      {
        name: 'Markab',
        description: 'Reducer video size',
        largeDescription: 'Coming soon',
        id: 'markab',
        url: 'celebrity-detection',
        color: '#4cb2c7',
        shadow: '#00d3ff',
        width: '5rem',
        position: { top: '0%', left: '20%' },
        disable: true
      }
    ]
  }

]

export default constellations
