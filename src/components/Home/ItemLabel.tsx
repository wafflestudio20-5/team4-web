import { Label, displayLabel } from '../../lib/interface';
import styles from './ItemLabel.module.css';

interface ItemLabelProps {
  label: string;
}

export default function ItemLabel({ label }: ItemLabelProps) {
  switch (label) {
    case Label.limited:
      return <div></div>;
    case Label.boutique:
      return <div className={styles.botique}> {displayLabel(label)} </div>;
    case Label.preorder:
      return <div></div>;
    case Label.exclusive:
      return <div></div>;
    default:
      throw new Error('Unknown Label: ' + label);
  }
}
