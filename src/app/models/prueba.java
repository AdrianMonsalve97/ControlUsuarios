public class Main {
    static int[] myArray = {1, 2, -1, 1, 0, 1, 2, -1, -1, -2};

    public static void main(String[] args) {
        int[][] grid = new int[4][4];
        int x = 0;
        int y = 0;

        for (int i = 0; i < myArray.length; i += 2) {
            int dx = myArray[i];
            int dy = myArray[i + 1];

            if (x + dx >= 0 && x + dx < 4 && y + dy >= 0 && y + dy < 4) {
                x += dx;
                y += dy;
            } else {
                if (x + dx < 0) {
                    x = 0;
                } else if (x + dx >= 4) {
                    x = 3;
                } else {
                    x += dx;
                }

                if (y + dy < 0) {
                    y = 0;
                } else if (y + dy >= 4) {
                    y = 3;
                } else {
                    y += dy;
                }
            }
        }

        for (int i = 0; i < 4; i++) {
            for (int j = 0; j < 4; j++) {
                if (i == y && j == x) {
                    System.out.print("X ");
                } else {
                    System.out.print("O ");
                }
            }
            System.out.println();
        }
    }
}
