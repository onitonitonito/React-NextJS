// Define a type for the component props
type HomeProps = {
  name?: string;
};

export default function Home({ name = 'NextJS' }: HomeProps) {
  return (
    <main>
      <div>
        <h2>상품 목록</h2>
        <a href="/">홈으로 이동하기</a>
      </div>
    </main>
  );
}
