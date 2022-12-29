import styles from './ChannelHeader.module.scss';

export default function ChannelHeader() {
  return (
    <div className={styles.channel}>
      <span className={styles.channel_terrace}>테라스샵</span>
      <div className={styles.channel_aside}>
        <div className={styles.channel_raffle}>
          래플에 참여해 보세요!
          <span className={styles.channel_raffle_link}>래플 바로가기</span>
        </div>
        <span>브랜드 구인</span>
      </div>
    </div>
  );
}
