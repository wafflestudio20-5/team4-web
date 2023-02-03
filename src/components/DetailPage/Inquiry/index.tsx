import { Inquiry } from '../../../lib/interface';
import InquiryBoxLayout from './InquiryBoxLayout';

interface InquiryBoxProps {
  inquiry: Inquiry;
}

export default function InquiryBox({ inquiry }: InquiryBoxProps) {
  return <InquiryBoxLayout inquiry={inquiry} />;
}
