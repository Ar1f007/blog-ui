import JoditEditor from 'jodit-react';

import type { FC } from 'react';

type Props = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
};

const Description: FC<Props> = ({ content, setContent }) => {
  const config = {
    toolbar: true,
    hidePoweredByJodit: true,
    spellcheck: true,
    language: 'en',
    toolbarButtonSize: 'medium',
    // toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    askBeforePasteHTML: true,
    askBeforePasteFromWord: true,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  return (
    <JoditEditor
      config={config}
      value={content}
      onBlur={(newContent: string) => setContent(newContent)}
    />
  );
};
export default Description;
