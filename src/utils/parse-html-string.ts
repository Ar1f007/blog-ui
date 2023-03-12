import parse, { Element } from 'html-react-parser';

export const parseHTMLToString = (input: string) =>
  parse(input, {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.attribs.class === 'remove') {
        return null;
      }
    },
  });
