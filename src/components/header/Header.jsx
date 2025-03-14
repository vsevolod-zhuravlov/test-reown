import styles from "./Header.module.css"
import ConnectButton from "../connectButton/ConnectButton"

export function Header() {
    return (
        <header className={styles["header"]}>
            <div className={styles["container"]}>
                <div className={styles["logo"]}>Logo</div>
                <ConnectButton />
            </div>
        </header>
    )
}