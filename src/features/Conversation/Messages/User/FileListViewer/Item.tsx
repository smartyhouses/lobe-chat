import { Typography } from 'antd';
import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import FileIcon from '@/components/FileIcon';
import { useChatStore } from '@/store/chat';
import { ChatFileItem } from '@/types/message';
import { formatSize } from '@/utils/format';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    cursor: pointer;

    overflow: hidden;

    max-width: 420px;
    padding-block: 8px;
    padding-inline: 12px 24px;

    border: 1px solid ${token.colorBorder};
    border-radius: 8px;

    &:hover {
      background: ${token.colorFillTertiary};
    }
  `,
}));

const FileItem = memo<ChatFileItem>(({ id, fileType, size, name }) => {
  const { styles } = useStyles();

  const openFilePreview = useChatStore((s) => s.openFilePreview);
  return (
    <Flexbox
      className={styles.container}
      gap={12}
      horizontal
      key={id}
      onClick={() => {
        openFilePreview(id);
      }}
    >
      <FileIcon fileName={name} fileType={fileType} />
      <Flexbox>
        <Typography.Text ellipsis>{name}</Typography.Text>
        <Typography.Text type={'secondary'}>{formatSize(size)}</Typography.Text>
      </Flexbox>
    </Flexbox>
  );
});
export default FileItem;
