import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      web vote
      <Link href='/about' color='blue.400' _hover={{ color: 'blue.500' }}>
        About
      </Link>
    </main>
  )
}
