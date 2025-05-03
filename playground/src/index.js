import './index.css';
import Test from './test.md';

document.querySelector('#root').innerHTML = `
<div class="content">
  ${Test}
</div>
`;
