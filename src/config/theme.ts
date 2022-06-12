const colors = {
  yellow: '#FFD02C',
  gray1: '#F5F5F5',
  gray2: '#dbdbdb',
  gray3: '#8F8F8F',
  gray4: '#e2e2e2',
  black: '#171717',
  white: '#fff'
}

export const theme = {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: '"Plus Jakarta Sans", system-ui, -apple-system, Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: '"Roboto Mono", monospace'
  },
  fontSizes: {
    xxs: '0.75rem', // 12px
    xs: '0.875rem', // 14px
    sm: '1rem', // 16px
    md: '1.125rem', // 18px
    xlg: '6.5rem' // 104px
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125
  },
  colors: {
    ...colors,
    title: colors.black,
    text: colors.gray4,
    label: colors.gray3,
    vue: {
      bg: 'rgba(65, 184, 131, 0.15)',
      color: '#41B883'
    },
    react: {
      bg: 'rgba(97, 218, 251, 0.15);',
      color: '#41C6EB'
    },
    javascript: {
      bg: 'rgba(247, 223, 30, 0.15)',
      color: '#5D5307'
    },
    node: {
      bg: 'rgba(104, 159, 99, 0.15)',
      color: '689F63'
    },
    gatsby: {
      bg: 'rgba(102, 51, 153, 0.15)',
      color: '#663399'
    }
  },
  text: {
    heading: {
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading'
    }
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body'
    },
    h1: {
      variant: 'text.heading',
      fontSize: 5
    },
    h2: {
      variant: 'text.heading',
      fontSize: 4
    },
    h3: {
      variant: 'text.heading',
      fontSize: 3
    },
    h4: {
      variant: 'text.heading',
      fontSize: 2
    },
    h5: {
      variant: 'text.heading',
      fontSize: 1
    },
    h6: {
      variant: 'text.heading',
      fontSize: 0
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit'
      }
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit'
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid'
    }
  }
}
