import { Label, displayLabel } from '../../lib/interface';
import styles from './ItemLabel.module.css';

interface ItemLabelProps {
  label: Label;
}

export default function ItemLabel({ label }: ItemLabelProps) {
  switch (label) {
    case Label.limited:
      return <></>;
    case Label.boutique:
      return <div className={styles.botique}> {displayLabel(label)} </div>;
    case Label.preorder:
      return <></>;
    case Label.exclusive:
      return <></>;
  }
}
