export const options = {
   layout: {
      randomSeed: 23,
      improvedLayout: true,
      hierarchical: {
         enabled: false,
         blockShifting: true,
         edgeMinimization: true,
         nodeSpacing: 150,
         direction: 'RL',
         sortMethod: 'directed',
      },
   },
   // interaction: {
   //    navigationButtons: true,
   //    dragNodes: true,
   //    dragView: true,
   //    hideEdgesOnDrag: false,
   //    hideEdgesOnZoom: false,
   //    hideNodesOnDrag: false,
   //    hover: false,
   //    hoverConnectedEdges: true,
   //    keyboard: {
   //       enabled: false,
   //       speed: { x: 10, y: 10, zoom: 0.02 },
   //       bindToWindow: true,
   //    },
   //    multiselect: false,
   //    selectable: true,
   //    selectConnectedEdges: true,
   //    tooltipDelay: 300,
   //    zoomSpeed: 1,
   //    zoomView: true,
   // },
   clickToUse: false,
   groups: {
      idea: {
         color: {
            border: '#FFC',
            background: '#FFC',
            fontSize: 5,
            highlight: {
               border: '#FFC',
               background: '#FFC',
            },
         },
      },
      question: {
         color: {
            border: '#CCF',
            background: '#CCF',
            highlight: {
               border: '#CCF',
               background: '#CCF',
            },
         },
      },
      information: {
         color: {
            border: '#CFC',
            background: '#CFC',
            highlight: {
               border: '#CFC',
               background: '#CFC',
            },
         },
      },
      experiment: {
         color: {
            border: '#FFDBDB',
            background: '#FFDBDB',
            highlight: {
               border: '#FFDBDB',
               background: '#FFDBDB',
            },
         },
      },
      record: {
         color: {
            border: '#B9DCF4',
            background: '#B9DCF4',
            highlight: {
               border: '#B9DCF4',
               background: '#B9DCF4',
            },
         },
      },
      reply: {
         color: {
            border: '#FFF',
            background: '#FFF',
            highlight: {
               border: '#FFF',
               background: '#FFF',
            },
         },
      },
      // add more groups here
   },
   edges: {
      color: '#8B8B8B',
      width: 1,
      length: 600,
      // color: { inherit: 'from' },
      arrows: {
         from: {
            enabled: true,
            scaleFactor: 0.7,
         },
         to: {
            enabled: false,
         },
      },
   },
   nodes: {
      shape: 'box',
      borderWidth: 1,
      shapeProperties: {
         borderRadius: 1,
      },
      color: {
         border: '#E3DFFD',
         background: '#E3DFFD',
         highlight: {
            border: '#e3dffdcb',
            background: '#e3dffdcb',
         },
         hover: {
            border: '#e3dffdcb',
            background: '#e3dffdcb',
         },
      },
      opacity: 1,
      fixed: {
         x: true,
         y: true,
      },
      font: {
         color: '#343434',
         size: 2, // px
         face: 'arial',
         background: 'none',
         strokeWidth: 0, // px
         strokeColor: '#ffffff',
         align: 'left',
         multi: false,
         vadjust: 0,
         bold: {
            color: '#343434',
            size: 2, // px
            face: 'arial',
            vadjust: 0,
            mod: 'bold',
         },
         ital: {
            color: '#343434',
            size: 5, // px
            face: 'arial',
            vadjust: 0,
            mod: 'italic',
         },
         boldital: {
            color: '#343434',
            size: 5, // px
            face: 'arial',
            vadjust: 0,
            mod: 'bold italic',
         },
         mono: {
            color: '#343434',
            size: 5, // px
            face: 'courier new',
            vadjust: 2,
            mod: '',
         },
      },
      hidden: false,
      label: 'HTML',
      level: undefined,
      margin: 10,
      shadow: {
         color: 'rgba(33,33,33,.7)',
         size: 10,
         x: 10,
         y: 10,
      },
      heightConstraint: { minimum: 100, valign: 'middle' },
      widthConstraint: { minimum: 100, maximum: 100 },
      mass: 1,
      physics: false,
      scaling: {
         label: {
            enabled: true,
            min: 16,
            max: 16,
            drawThreshold: 12,
            // maxVisible: 30,
         },
         customScalingFunction: function (min, max, total, value) {
            if (max === min) {
               return 0.5
            } else {
               let scale = 1 / (max - min)
               return Math.max(0, (value - min) * scale)
            }
         },
      },
      value: 1,
   },
}
