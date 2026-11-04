"""Contact sheet: python3 sheet.py <dir_with_f_*.png> <out.jpg> [cols]"""
import sys, subprocess, glob
d, out = sys.argv[1], sys.argv[2]; cols = int(sys.argv[3]) if len(sys.argv) > 3 else 9
fs = sorted(glob.glob(d + '/f_*.png'), key=lambda f: float(f.split('f_')[1][:-4]))
a = []; [a.extend(['-i', f]) for f in fs]
n = len(fs); rows = [list(range(i, min(i + cols, n))) for i in range(0, n, cols)]
fc = ''.join(f'[{i}]scale=270:480[s{i}];' for i in range(n))
for r, ids in enumerate(rows):
    fc += ''.join(f'[s{i}]' for i in ids) + (f'hstack={len(ids)}' if len(ids) > 1 else 'null') + f',pad={cols*270}:480[r{r}];'
fc += ''.join(f'[r{r}]' for r in range(len(rows))) + (f'vstack={len(rows)}' if len(rows) > 1 else 'null')
subprocess.run(['ffmpeg', '-v', 'error', '-y', *a, '-filter_complex', fc, out], check=True)
